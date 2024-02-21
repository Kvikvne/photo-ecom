// cart.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Middleware to check if the user has an active session
const checkSession = (req, res, next) => {
  if (!req.session || !req.sessionID) {
    return res.status(401).json({ error: "Unauthorized - Missing session" });
  }
  next();
};

router.post("/add", checkSession, cartController.addToCart);
router.put(
  "/updateQuantity/:itemId",
  checkSession,
  cartController.updateCartItemQuantity
);
router.get("/", checkSession, cartController.getCartItems);
router.delete("/remove/:itemId", checkSession, cartController.deleteCartItem);

module.exports = router;
