const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { connectToDb, getDb } = require('./db/connection');
const cartModel = require('./db/models/cartModel'); // Import your cartModel

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

let db;

// Connect to the MongoDB database
connectToDb('mongodb://127.0.0.1:27017/photoWebsite', async (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Get the database instance
  db = getDb();

  // Assuming 'cart' is your collection name
  const cartCollection = db.collection('cart');

  // Set the collection in cartModel
  cartModel.setCollection(cartCollection);

  // Start the Express app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the API' });
});

app.get('/photos', async (req, res) => {
  let photos = [];

  db.collection('photos')
    .find()
    .sort({ id: 1 })
    .forEach((photo) => photos.push(photo))
    .then(() => {
      res.status(200).json(photos);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch items' });
    });
});
