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

app.get('/test', (req, res) => {
	res.send('Hello from express server');
});

app.get('/hallosvenja', (req, res) => {
	res.send('Hello David from express server');
});
app.get('/SelectTagNameFromTag', async (req, res) => {
	const tags = await db.select('tagname').from('tag');
	res.json(tags);
});

app.get('/SelectAllFromStack', async (req, res) => {
	const stack = await db.select().from('stack');
	res.json(stack);
});

app.get('/SelectAllFromCard', async (req, res) => {
	const deck = await db.select().from('card');
	res.json(deck);
});

app.get('/GetRandomCardWithStatus0', async (req, res) => {
	try {
		const card = await db('card')
			.where('cardstatus', 0)
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

app.post('/InsertCardBackCardFrontInCard', async (req, res) => {
	const { front, back, stackid } = req.body; // Annahme: Die Werte für front und back kommen im Request Body an
	console.log(req.body);
	console.log(front);
	// try {
	const card = await db.insert({ front: front, back: back, stackid: stackid }).into('card');

	//   res.status(201).json({ message: 'Daten wurden erfolgreich eingefügt.' });
	// } catch (error) {
	//   console.error('Fehler beim Einfügen der Daten:', error);
	//   res.status(500).json({ error: 'Fehler beim Einfügen der Daten.' });
	// }

	const stack = await db.select().from('stack');
	res.json(stack);
});

app.post('/InsertCardBackCardFrontInCard', async (req, res) => {
	const { front, back } = req.body; // Annahme: Die Werte für front und back kommen im Request Body an
	console.log(req.body);
	console.log(front);

	const card = await db.insert({ front: front, back: back }).into('card');
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

			const secretKey = process.env.SECRET_KEY; //generated secret key
			const tocken = jwt.sign({ userid: user.userid, email: user.email }, process.env.SECRET_KEY);

			console.log(tocken);
			res.cookie('jwt', tocken, {
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60 * 1000, // ein Tag
				sameSite: 'none'
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
=======
  const stack = await db.select().from('stack');
  res.json(stack);
})

app.get('/GetRandomCardWithStatus0', async (req, res) => {
  try {
    const card = await db('card')
      .where('cardstatus', 0)
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

app.put('/UpdateCardStatusTo1', async (req, res) => {
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

app.put('/UpdateCardStatusTo2', async (req, res) => {
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

app.put('/UpdateCardStatusTo3', async (req, res) => {
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



app.post('/InsertCardBackCardFrontInCard', async(req,res) => {
  const { front, back } = req.body; // Annahme: Die Werte für front und back kommen im Request Body an
  console.log(req.body);
  console.log(front);
  // try {
    const card = await db.insert({front: front, back: back}).into('card');
 
//   res.status(201).json({ message: 'Daten wurden erfolgreich eingefügt.' });
// } catch (error) {
//   console.error('Fehler beim Einfügen der Daten:', error);
//   res.status(500).json({ error: 'Fehler beim Einfügen der Daten.' });
// }
})


//Muss am Schluss sein, da vor dem Starten erstmal alles definiert werden muss
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
