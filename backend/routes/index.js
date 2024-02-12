// index.js
const express = require('express');
const db = require('../db/connection');
const router = express.Router();
// const photoController = require('../controllers/photosController')

// // Gallery photos route
// router.get('/photos', photoController.getPhotosController);

// test route
router.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the API' });
});

module.exports = router;