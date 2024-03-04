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
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '2002',
    database: 'ankikarten',
  },
});

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello from express server')
})

app.get('/tags', async (req, res) => {
  console.log('Anfrage am /tags Endpunkt');
  const tags = await db.select('Titel').from('tags');
  res.json(tags);
})

//Muss am Schluss sein, da vor dem Starten erstmal alles definiert werden muss
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
