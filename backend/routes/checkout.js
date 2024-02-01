const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Middleware to check if the user has an active session
const checkSession = (req, res, next) => {
    if (!req.session || !req.sessionID) {
      return res.status(401).json({ error: "Unauthorized - Missing session" });
    }
    next();
};

router.post('/', checkSession, checkoutController.initiateCheckout);

module.exports = router;