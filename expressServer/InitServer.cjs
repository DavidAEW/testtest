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
