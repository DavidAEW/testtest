// server.js

const express = require('express');
const knex = require('knex');
const cors = require('cors'); // Importiere das cors-Modul

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
    database: 'ankikarten',
  },
});

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello Svenja from express server')
})

app.get('/hallosvenja', (req, res) => {
  res.send('Hello David from express server')
})
app.get('/SelectTagNameFromTag', async (req, res) => {
  const tags = await db.select('tagname').from('tag');
  res.json(tags);
})

app.get('/SelectAllFromStack', async (req, res) => {
  const stack = await db.select().from('stack');
  res.json(stack);
})

app.get('/SelectAllFromCard', async (req, res) => {
  const deck = await db.select().from('card');
  res.json(deck);
})

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
