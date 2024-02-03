const { ObjectId } = require("mongodb");

let ordersCollection;

module.exports = {
    setCollection: (collection) => {
      ordersCollection = collection;
    },

getOrders: async (sessionID) => {
    try {
      const orders = await ordersCollection
        .find({ "session_id": sessionID })
        .toArray();
      return orders;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  },

}