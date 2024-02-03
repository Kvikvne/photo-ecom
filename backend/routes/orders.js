const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Middleware to check if the user has an active session
const checkSession = (req, res, next) => {
    if (!req.session || !req.sessionID) {
      return res.status(401).json({ error: "Unauthorized - Missing session" });
    }
    next();
  };

router.get("/", checkSession, orderController.getOrders);

module.exports = router;