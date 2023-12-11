const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/add', cartController.addToCart);

router.get('/cart', cartController.getCartItems);

router.delete('/cart/remove/:itemId', cartController.deleteCartItem);

module.exports = router;

