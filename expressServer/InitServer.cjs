// server.js

const express = require('express');
const knex = require('knex');
const cors = require('cors'); // Importiere das cors-Modul
const argon2 = require('argon2'); // Für das Hashen von Passwörtern
const jwt = require('jsonwebtoken'); // Für das Erstellen von JSON Web Tokens
const cookieParser = require('cookie-parser'); // Für das Verarbeiten von Cookies

require('dotenv').config(); // Lädt die .env-

const app = express();
const PORT = 3001;
// Aktiviere CORS für alle Anfragen
app.use(
	cors({
		credentials: true, // -> damit Cookies gesetzt werden können
		origin: true // -> erlaubte Origin -> für testzweck erst mal alles
	})
);

app.use(cookieParser()); //-> Cookies verarbeiten z.B. req.cookies["jwt"]

// Konfiguration für die MySQL-Datenbank
const db = knex({
	client: 'mysql2',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	}
});

app.use(express.json());

// Überprüfung der Datenbankverbindung
db.raw('SELECT 1')
	.then(() => {
		console.log('Verbindung zur Datenbank hergestellt.');
	})
	.catch((err) => {
		console.error('Fehler bei der Verbindung zur Datenbank:', err);
		process.exit(1); // Beende den Server, wenn die Verbindung fehlschlägt
	});

app.get('/test', (req, res) => {
	res.send('Hello from express server');
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await db.select('*').from('user').where('email', email).first(); //-> erst mal nach email suchen
		if (!user) {
			return res.status(400).json({ message: 'Benutzer nicht gefunden.' });
		}

		const comparePassword = await argon2.verify(user.password, password); //-> dann das Passwort vergleichen

		if (comparePassword) {
			//-> wenn das Passwort auch stimmt, dann Token erstellen
			const tocken = jwt.sign({ userid: user.userid, email: user.email }, process.env.SECRET_KEY, {
				algorithm: 'HS256'
			});
			res.cookie('jwt', tocken, {
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60 * 1000 // ein Tag
			});
			res.status(201).json({ message: 'Login erfolgreich.' });
		} else {
			res.status(400).json({ message: 'Falsches Passwort.' });
		}
	} catch (error) {
		console.error('Fehler beim Einloggen:', error);
		res.status(500).json({ message: 'Serverfehler beim Einloggen.' });
	}
});

app.post('/addUser', async (req, res) => {
	const { email, username, password } = req.body;

	try {
		// schau ob User schon existiert
		const existingUser = await db
			.select('*')
			.from('user')
			.where('email', email)
			.orWhere('username', username)
			.first();

		// Wenn gleiche Email oder Username schon existiert, dann gebe Fehlermeldung zurück
		if (existingUser) {
			return res.status(400).json({ message: 'Benutzername oder E-Mail existiert bereits.' });
		}

		const hashedPassword = await argon2.hash(password, {
			//-> Passwort hashen
			type: argon2.argon2id,
			memoryCost: 2 ** 16, // 64 MB
			timeCost: 3,
			parallelism: 1
		});

		// sonst normal hinzufügen
		const newUser = await db
			.insert({
				email: email,
				username: username,
				password: hashedPassword
			})
			.into('user');

		// Überprüfe, ob Post erfolgreich war
		if (newUser) {
			res.status(201).json({ message: 'Neuer Benutzer erfolgreich hinzugefügt.' });
		} else {
			res.status(500).json({ message: 'Unbekannter Fehler beim Hinzufügen des Benutzers.' });
		}
	} catch (error) {
		console.error('Fehler beim Hinzufügen des Benutzers:', error);
		res.status(500).json({ message: 'Serverfehler beim Hinzufügen des Benutzers.' });
	}
});

const authenticateJWT = (req, res, next) => {
	const token = req.cookies['jwt'];

	if (!token) {
		return res.status(401).json({ message: 'Auth token is missing' });
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Unauthorized. Invalid token.' });
		}

		req.user = user;
		next();
	});
};

app.use(authenticateJWT); // Verwende Middleware um JWT zu überprüfen

app.get('/SelectAllFromTag', async (req, res) => {
	const userID = req.user.userid;
	const tags = await db.select().from('tag').where('tag.userid', userID);
	res.json(tags);
});

// --> Hinzufügen eine neue Deck
app.post('/decks/create', async (req, res) => {
	const { deckName } = req.body;
	const userId = req.user.userid;
	console.log(userId);
	try {
		// Zuerst den neuen Stapel in der 'deck' Tabelle erstellen
		const [newDeckId] = await db('deck').insert({
			deckName: deckName
		});
		// Dann den Stapel dem Benutzer zuordnen in der 'user_deck' Tabelle
		await db('user_deck').insert({
			userid: userId,
			deckId: newDeckId
		});

		res.json({ success: true, message: 'Stapel erfolgreich erstellt', deckId: newDeckId });
	} catch (error) {
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.post('/HinzufuegenTag', async (req, res) => {
	const userId = req.user.userid;
	const { tagname } = req.body;
	const tag = await db.insert({ tagname: tagname, userid: userId }).into('tag');
	if (tag) {
		// Wenn der Tag erfolgreich gelöscht wurde
		res.status(200).json({ message: 'Tag erfolgreich gelöscht' });
	} else {
		// Wenn der Tag nicht gefunden wurde
		res.status(404).json({ error: 'Tag nicht gefunden' });
	}
});

app.post('/LoeschenTag', async (req, res) => {
	const { tagname } = req.body;
	try {
		const tag = await db('tag').where('tagname', tagname).del();
		if (tag) {
			// Wenn der Tag erfolgreich gelöscht wurde
			res.status(200).json({ message: 'Tag erfolgreich gelöscht' });
		} else {
			// Wenn der Tag nicht gefunden wurde
			res.status(404).json({ error: 'Tag nicht gefunden' });
		}
	} catch (error) {
		// Wenn ein Fehler auftritt
		console.error('Fehler beim Löschen des Tags:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.post('/AnzeigenDeckTag', async (req, res) => {
	const { deckId } = req.body;
	try {
		const all = await db.select().from('deck_tag').where('deckId', deckId);

		res.json(all);
	} catch (error) {
		// Wenn ein Fehler auftritt
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.post('/HinzufuegenInDeckTag', async (req, res) => {
	const { tagid, deckId } = req.body;
	try {
		const all = await db.insert({ tagid: tagid, deckId: deckId }).into('deck_tag');
		res.json(all);
	} catch (error) {
		// Wenn ein Fehler auftritt
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.post('/LoeschenDeckTag', async (req, res) => {
	const { tagid, deckId } = req.body;
	try {
		const all = await db('deck_tag').where('tagid', tagid).where('deckId', deckId).del();
		res.json(all);
	} catch (error) {
		// Wenn ein Fehler auftritt
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.get('/SelectAllFromDeck', async (req, res) => {
	const userID = req.user.userid;
	const deck = await db
		.select()
		.from('deck')
		.join('user_deck', 'deck.deckId', 'user_deck.deckId')
		.where('user_deck.userid', userID);
	console.log(deck);
	res.json(deck);
});

app.get('/SelectAllFromCard', async (req, res) => {
	const deck = await db.select().from('card');
	res.json(deck);
});

app.post('/GetRandomCardWithStatus', async (req, res) => {
	const { cardStatus, deckId } = req.body;
	try {
		const card = await db('card')
			.where('cardstatus', cardStatus)
			.where('deckId', deckId)
			.orderByRaw('RAND()')
			.first()
			.select('front', 'back');

		if (card) {
			res.json(card);
		} else {
			res.status(404).send('No card found with status ' + cardStatus);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving card');
	}
});

app.post('/InsertCardBackCardFrontInCard', async (req, res) => {
	const { front, back, deckId } = req.body; // Annahme: Die Werte für front und back kommen im Request Body an
	console.log(req.body);
	console.log(front);
	// try {
	const card = await db.insert({ front: front, back: back, deckId: deckId }).into('card');

	//   res.status(201).json({ message: 'Daten wurden erfolgreich eingefügt.' });
	// } catch (error) {
	//   console.error('Fehler beim Einfügen der Daten:', error);
	//   res.status(500).json({ error: 'Fehler beim Einfügen der Daten.' });
	// }

	const deck = await db.select().from('deck');
	res.json(deck);
});

app.get('/user', async (req, res) => {
	try {
		const cookie = req.cookies['jwt'];
		const claims = jwt.verify(cookie, process.env.SECRET_KEY);

		// Stelle sicher, dass claims vorhanden sind
		if (!claims) {
			return res.status(401).json({ message: 'Nicht autorisiert' });
		}

		// um Benutzerdaten zu abrufen
		const user = await db('user').where({ userid: claims.userid }).first();
		if (!user) {
			return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
		}

		// Entferne das Passwort aus der Antwort wir wollen pw nicht anzeigen lassen
		const { password, ...data } = user;
		res.json(data);
	} catch (error) {
		console.error('Fehler beim Abrufen des Benutzers:', error);
		res.status(500).json({ message: 'Serverfehler' });
	}
});

app.post('/logout', (req, res) => {
	res.clearCookie('jwt', '', { maxAge: 0 });
	res.send('Erfolgreich ausgeloggt');
});

app.get('/getUser', async (req, res) => {
	const userInfo = await db.select('username', 'email').from('user');
	res.json(userInfo);
	console.log(userInfo);

	/*
	--> BSP Response 
	[
    {
        "username": "Test",
        "email": "test@g.com"
    }
	]
	*/
});

// -> Karte exportieren zum sharen
app.get('/exportCards/:deckId', async (req, res) => {
	const { deckId } = req.params;

	try {
		// Zuerst den Namen des Decks abrufen
		const deckInfo = await db.select('deckName').from('deck').where('deckId', deckId).first();

		if (!deckInfo) {
			return res.status(404).send('Deck nicht gefunden für deckId: ' + deckId);
		}

		// Dann die Karten des Decks abrufen
		const cards = await db
			.select('cardid', 'front', 'back', 'cardstatus', 'deckId')
			.from('card')
			.where('deckId', deckId);

		if (cards.length) {
			// Deck-Name zusammen mit den Karten exportieren
			res.json({ deckName: deckInfo.deckName, cards });
		} else {
			res.status(404).send('Keine Karten gefunden für deckId: ' + deckId);
		}
	} catch (error) {
		console.error('Fehler beim Exportieren der Karten:', error);
		res.status(500).send('Serverfehler beim Exportieren der Karten.');
	}
});

/*
response von export die soll dann req.body für import sein 
{
    "deckName": "moin",
    "cards": [
        {
            "cardid": 55,
            "front": "ich",
            "back": "fixe",
            "cardstatus": 2,
            "deckId": 2
        },
        {
            "cardid": 59,
            "front": "dfa",
            "back": "dafsdf",
            "cardstatus": 2,
            "deckId": 2
        }
	]
	}
*/

// -> Karte importieren zum sharen
app.post('/importCards', async (req, res) => {
	const { cards, deckName } = req.body;
	const userId = req.user.userid;

	if (!cards || cards.length === 0) {
		return res.status(400).send('Keine Karten zum Importieren angegeben.');
	}

	try {
		// Erstelle einen neuen Stapel für den Import und erhalte die ID des neuen Stapels
		const deckInsertResult = await db('deck').insert({
			deckName: deckName
		});

		// MySQL gibt die insertId des zuletzt eingefügten Datensatzes zurück
		const newDeckId = deckInsertResult[0];
		// Ordne den neuen Deck Benutzer zu
		await db('user_deck').insert({
			userid: userId,
			deckId: newDeckId
		});

		// Füge jede Karte dem neu erstellten Stapel hinzu
		for (let card of cards) {
			await db('card').insert({
				front: card.front,
				back: card.back,
				cardstatus: 0, // Standardmäßig auf 0 setzen
				deckId: newDeckId // Verwende die ID neue Deck
			});
		}

		res
			.status(201)
			.json({ success: true, message: 'Karten erfolgreich importiert', newDeckId: newDeckId });
	} catch (error) {
		console.error('Fehler beim Importieren der Karten:', error);
		res.status(500).json({ error: 'Interner Serverfehler beim Importieren der Karten.' });
	}
});

app.get('/SelectAllFromCard', async (req, res) => {
	const deck = await db.select().from('card');
	res.json(deck);
});

app.post('/GetRandomCardWithStatus', async (req, res) => {
	const { cardStatus, deckId } = req.body;
	try {
		const card = await db('card')
			.where('cardstatus', cardStatus)
			.where('deckId', deckId)
			.orderByRaw('RAND()')
			.first()
			.select('front', 'back');

		if (card) {
			res.json(card);
		} else {
			res.status(404).send('No card found with status 0');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving card');
	}
});

app.put('/UpdateCardStatus', async (req, res) => {
	const { front, back, newCardStatus } = req.body;

	try {
		const updatedCard = await db('card')
			.where({ front, back })
			.update({ cardstatus: newCardStatus });

		if (updatedCard) {
			res.status(200).json({ message: 'Kartenstatus erfolgreich aktualisiert.' });
		} else {
			res.status(404).json({ message: 'Keine Karte gefunden.', error: true });
		}
	} catch (error) {
		console.error('Fehler beim Aktualisieren des Kartenstatus:', error);
		res.status(500).json({ error: 'Fehler beim Aktualisieren des Kartenstatus.' });
	}
});

app.post('/InsertCardBackCardFrontInCard', async (req, res) => {
	const { front, back } = req.body; // Annahme: Die Werte für front und back kommen im Request Body an
	console.log(req.body);
	console.log(front);
	// try {
	const card = await db.insert({ front: front, back: back }).into('card');

	//   res.status(201).json({ message: 'Daten wurden erfolgreich eingefügt.' });
	// } catch (error) {
	//   console.error('Fehler beim Einfügen der Daten:', error);
	//   res.status(500).json({ error: 'Fehler beim Einfügen der Daten.' });
	// }
});

app.post('/updateCard', async (req, res) => {
	const { cardid, front, back, cardstatus, deckId } = req.body;

	const updatecard = await db('card')
		.where('cardid', cardid)
		.update({ front: front, back: back, cardstatus: cardstatus, deckId: deckId });

	res.status(200).send('Datensatz erfolgreich aktualisiert');
});

app.get('/SelectAllDecks', async (req, res) => {
	const userID = req.user.userid;
	const decks = await db
		.select()
		.from('deck')
		.join('user_deck', 'deck.deckId', 'user_deck.deckId')
		.where('user_deck.userid', userID);
	res.json(decks);
});

app.get('/SelectAllStatus', async (req, res) => {
	const status = await db.select().from('card_status');
	res.json(status);
});

app.post('/SelectAllFromCardWithDeck', async (req, res) => {
	const { selectedOption } = req.body;
	try {
		const data = await db.select().from('card').where('deckId', selectedOption);

		res.json(data);
	} catch (error) {
		// Wenn ein Fehler auftritt
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.post('/deleteDecks', async (req, res) => {
	const { deckId } = req.body;

	try {
		// Zuerst alle Karten löschen, die zum Stapel gehören
		await db.delete().from('card').where('deckId', deckId);

		// Dann den Stapel selbst löschen
		const dele = await db.delete().from('deck').where('deckId', deckId);

		res.json({ success: true, message: 'Stapel und zugehörige Karten erfolgreich gelöscht' });
	} catch (error) {
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

app.post('/deleteCard', async (req, res) => {
	const { cardId } = req.body;

	try {
		// Dann den Stapel selbst löschen
		const dele = await db.delete().from('card').where('cardid', cardId);

		res.json({ success: true, message: 'Karte erfolgreich gelöscht' });
	} catch (error) {
		console.error('Fehler:', error);
		res.status(500).json({ error: 'Interner Serverfehler' });
	}
});

//Muss am Schluss sein, da vor dem Starten erstmal alles definiert werden muss
app.listen(PORT, (error) => {
	if (!error) console.log('Express Server wurde gestartet auf Port ' + PORT);
	else console.log('Express Server konnte nicht gestartet werden.', error);
});

//Glückwunsch, du hast es bis zum Ende geschafft!
