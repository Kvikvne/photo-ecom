const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/stripeController');

// Define your route
router.get('/products/search', searchProducts);

module.exports = router;