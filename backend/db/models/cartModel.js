// cartModel.js

const { ObjectID } = require("mongodb");

let cartCollection;

module.exports = {
  setCollection: (collection) => {
    cartCollection = collection;
  },

  addToCart: async (product_id, quantity, variant_id, price, variant_label, sku, img, name, description) => {
    try {
      const result = await cartCollection.insertOne({
        line_items: [
          {
            product_id,
            quantity,
            variant_id,
            metadata: {
              price,
              variant_label,
              sku,
              img,
              name,
              description
            }
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
