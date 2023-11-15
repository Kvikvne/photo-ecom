const express = require("express");
const routes = require('./routes');
const cors = require("cors"); 
const { connectToDb, getDb } = require("./db");
const app = express();
const port = process.env.PORT || 3000;

// ------------------ FOR PRODUCTION CREATE A CDN FOR THE IMAGES ------------------------


// Enable CORS for your Express app
app.use(cors());
app.use('/api', routes);

// db connection
let db;

connectToDb((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  db = getDb();
});

// routes
app.get("/photos", (req, res) => {
  let photos = [];
  
  db.collection("photos")
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

// frames route
app.get("/frames", (req, res) => {
  let frames = [];
  
  db.collection("frames")
    .find()
    .sort({ size: 1 })
    .forEach(frame => frames.push(frame))
    .then(() => {
      res.status(200).json(frames);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch items' });
    });
});

// Default route
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the API" });
});
