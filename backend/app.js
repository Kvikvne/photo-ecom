const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { connectToDb, getDb } = require('./db/connection');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/api', routes);

let db;

connectToDb('mongodb://127.0.0.1:27017/photoWebsite', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  db = getDb();
});

app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the API' });
});

app.get('/photos', async (req, res) => {
  let photos = [];
  
  db.collection('photos')
    .find()
    .sort({ id: 1 })
    .forEach(photo => photos.push(photo))
    .then(() => {
      res.status(200).json(photos);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch items' });
    });
});


