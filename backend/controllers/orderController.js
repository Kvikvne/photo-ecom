const orderModel = require('../db/models/orderModel')



const getOrders = async (req, res) => {
    const sessionID = req.sessionID;
  
    try {
      const orders = await orderModel.getOrders(sessionID);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  module.exports = {
    getOrders
  };