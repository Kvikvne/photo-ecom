// cart.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST route to add items to the cart
router.post('/add', cartController.addToCart);

router.get('/cart', cartController.getCartItems);


module.exports = router;

