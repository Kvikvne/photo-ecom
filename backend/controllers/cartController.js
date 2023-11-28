// cartController.js

const cartModel = require('../db/models/cartModel');

const addToCart = async (req, res) => {
  try {
    // Extract product data from the request body
    const { product_id, variant_id, sku, quantity, variant_label, price } = req.body;

    // Add more validation if needed

    // Use the cart model to interact with the cart collection
    await cartModel.addToCart(product_id, variant_id, sku, quantity, variant_label, price);

    // Send a success response
    res.status(200).json({ message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error('Error adding item to the cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await cartModel.getCartItems(); // Adjust based on your actual method in cartModel
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCartItems, addToCart };
