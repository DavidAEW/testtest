// server.js

const express = require('express');
const knex = require('knex');
const cors = require('cors'); // Importiere das cors-Modul
const argon2 = require('argon2'); // Für das Hashen von Passwörtern

const app = express();
const PORT = process.env.PORT || 3001;
// Aktiviere CORS für alle Anfragen
app.use(cors());

// Konfiguration für die MySQL-Datenbank
const db = knex({
	client: 'mysql2',
	connection: {
		host: 'dankikarten.mysql.database.azure.com',
		port: 3306,
		user: 'louis',
		password: 'GogoH1+5',
		database: 'ankikarten'
	}
});

app.use(express.json());

app.get('/test', (req, res) => {
	res.send('Hello from express server');
});

app.get('/SelectTagNameFromTag', async (req, res) => {
	const tags = await db.select('tagname').from('tag');
	res.json(tags);
});

app.get('/SelectAllFromStack', async (req, res) => {
	const stack = await db.select().from('stack');
	res.json(stack);
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
			return res.status(400).json({ message: 'Email nicht gefunden.' });
		}

		const comparePassword = await argon2.verify(user.password, password); //-> dann das Passwort vergleichen

		if (comparePassword) {
			res.json({ message: 'Erfolgreich eingeloggt.' });
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

		const hashedPassword = await argon2.hash(password); //-> Passwort hashen

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

//Muss am Schluss sein, da vor dem Starten erstmal alles definiert werden muss
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
