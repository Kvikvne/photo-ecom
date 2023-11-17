const express = require('express');
const printifyRoutes = require('./printifyRoutes');
const photosController = require('../controllers/photosController');


const router = express.Router();

router.use('/printify', printifyRoutes);
router.get('/photos', photosController.getPhotosController);

router.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the API' });
});

module.exports = router;
