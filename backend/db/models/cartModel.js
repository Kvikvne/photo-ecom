// cartModel.js

const { ObjectID } = require("mongodb");

let cartCollection;

module.exports = {
  setCollection: (collection) => {
    cartCollection = collection;
  },

  addToCart: async (product_id, variant_id, sku, quantity, variant_label, price) => {
    try {
      const result = await cartCollection.insertOne({
        line_items: [
          {
            product_id,
            variant_id,
            sku,
            quantity,
            variant_label,
            price,
          },
        ],
      });
      

      return result;
    } catch (error) {
      throw error;
    }
  },
  getCartItems: async () => {
    try {
      const cartItems = await cartCollection.find().toArray();
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  },

};
