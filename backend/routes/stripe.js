const express = require('express');
const router = express.Router();
const { searchProducts, processRefund } = require('../controllers/stripeController');

// Define your route
router.get('/products/search', searchProducts);
router.post('/refund-request', processRefund);

module.exports = router;