// index.js

const express = require('express');
const printifyRoutes = require('./printifyRoutes');
const photosController = require('../controllers/photosController');
const cartRoutes = require('./cart');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.use('/printify', printifyRoutes);
router.get('/photos', photosController.getPhotosController);

router.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the API' });
});

// Use the cart routes directly without a sub-route '/cart'
// router.use(cartRoutes);

// Handle the GET request for cart items directly in this file
router.get('/cart', cartController.getCartItems);

module.exports = router;
