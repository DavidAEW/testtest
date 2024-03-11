// server.js

const express = require('express');
const knex = require('knex');
const cors = require('cors'); // Importiere das cors-Modul

require('dotenv').config()

const app = express();
const PORT = 3001;
// Aktiviere CORS für alle Anfragen
app.use(cors());

// Konfiguration für die MySQL-Datenbank
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello from express server')
})

app.get('/SelectTagNameFromTag', async (req, res) => {
  const tags = await db.select('tagname').from('tag');
  res.json(tags);
})

app.get('/SelectAllFromStack', async (req, res) => {
  const stack = await db.select().from('stack');
  res.json(stack);
})

app.post('/InsertCardBackCardFrontInCard', async(req,res) => {
  const { front, back } = req.body; // Annahme: Die Werte für front und back kommen im Request Body an
    const card = await db.insert({front: front, back: back}).into('card');
})

app.post('/InsertUsers', async(req,res) => {
  const {username, email, passwort} = req.body;
  const user = await db.insert({username: username, email:email, passwort: passwort}).into('user');
})

//Muss am Schluss sein, da vor dem Starten erstmal alles definiert werden muss
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
