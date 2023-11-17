// cartModel.js

const { ObjectID } = require('mongodb');

let cartCollection;

module.exports = {
  setCollection: (collection) => {
    cartCollection = collection;
  },

  addToCart: async (product_id, variant_id, sku, quantity) => {
    try {
      const result = await cartCollection.insertOne({
        product_id,
        variant_id,
        sku,
        quantity,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  // Add more cart-related methods as needed
};
