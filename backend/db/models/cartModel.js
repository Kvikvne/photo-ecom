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
    description,
    print_provider_id,
    blueprint_id
  ) => {
    try {
      const existingItem = await cartCollection.findOne({
        "line_items.sessionID": sessionID,
        "line_items.product_id": product_id,
        "line_items.variant_id": variant_id,
      });

      if (existingItem) {
        // If the item exists, update its quantity
        await cartCollection.updateOne(
          {
            "line_items.sessionID": sessionID,
            "line_items.product_id": product_id,
            "line_items.variant_id": variant_id,
          },
          { $inc: { "line_items.$.quantity": quantity } }
        );
      } else {
        // If the item doesn't exist, add a new item to the cart
        await cartCollection.insertOne({
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
                print_provider_id,
                blueprint_id,
              },
            },
          ],
        });
      }
    } catch (error) {
      throw error;
    }
  },

  getCartItems: async (sessionID) => {
    try {
      const cartItems = await cartCollection
        .find({ "line_items.sessionID": sessionID })
        .toArray();
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  },

  deleteCartItem: async (itemId) => {
    try {
      // Find and delete the item from the cart collection
      const deletedItem = await cartCollection.findOneAndDelete({
        _id: new ObjectId(itemId),
      });

      return deletedItem;
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
      throw error;
    }
  },
  findCartItem: async (id_, sessionID, product_id, variant_id) => {
    try {
      const item = await cartCollection.findOne({
        id_: id_,
        "line_items.sessionID": sessionID,
        "line_items.product_id": product_id,
        "line_items.variant_id": variant_id,
      });
      return item;
    } catch (error) {
      throw error;
    }
  },
  updateCartItemQuantity: async (itemId, quantity, sessionID) => {
    try {
      const result = await cartCollection.updateOne(
        {
          _id: new ObjectId(itemId),
          "line_items.sessionID": sessionID,
        },
        { $set: { "line_items.$.quantity": quantity } }
      );

      return result;
    } catch (error) {
      console.error("Error updating item quantity:", error);
      throw error;
    }
  },
};
