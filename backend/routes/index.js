const express = require('express');
const printifyRoutes = require('./printifyRoutes');
const photosController = require('../controllers/photosController');
const cartRoutes = require('./cart');


const router = express.Router();

router.use('/printify', printifyRoutes);
router.get('/photos', photosController.getPhotosController);

router.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the API' });
});

router.use('/cart', cartRoutes);

module.exports = router;
