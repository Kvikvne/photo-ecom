// cartModal.js
const { ObjectId } = require("mongodb");

let cartCollection;

module.exports = {
  setCollection: (collection) => {
    cartCollection = collection;
  },

  addToCart: async (
    sessionID,
    id,
    shipping,
    product_id,
    quantity,
    variant_id,
    price,
    variant_label,
    sku,
    img,
    name,
    description
  ) => {
    try {
      const result = await cartCollection.insertOne({
        line_items: [
          {
            sessionID,
            id,
            shipping,
            product_id,
            quantity,
            variant_id,
            metadata: {
              price,
              variant_label,
              sku,
              img,
              name,
              description,
            },
          },
        ],
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  getCartItems: async (sessionID) => { // Add sessionID parameter
    try {
      const cartItems = await cartCollection.find({ 'line_items.sessionID': sessionID }).toArray();
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  },

  deleteCartItem: async (itemId) => {
    try {
      console.log("Deleting item with ID:", itemId);

      // Find and delete the item from the cart collection
      const deletedItem = await cartCollection.findOneAndDelete({
        _id: new ObjectId(itemId),
      });

      console.log("Item deleted:", deletedItem);

      return deletedItem;
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
      throw error;
    }
  },
};
