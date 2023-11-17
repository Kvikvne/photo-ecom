// cartController.js

const cartModel = require('../db/models/cartModel');

const cartController = {
  addToCart: async (req, res) => {
    try {
      // Extract product data from the request body
      const { product_id, variant_id, sku, quantity } = req.body;


      // Add more validation if needed

      // Use the cart model to interact with the cart collection
      await cartModel.addToCart(product_id, variant_id, sku, quantity);

      // Send a success response
      res.status(200).json({ message: 'Item added to the cart successfully' });
    } catch (error) {
      console.error('Error adding item to the cart:', error);
      res.status(500).json({ error: 'Internal server error' });
      console.log('Request Body:', req.body);
    }
  },

  // Add more cart-related methods as needed
};

module.exports = cartController;
