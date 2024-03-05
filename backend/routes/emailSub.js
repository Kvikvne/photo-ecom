const express = require('express');
const router = express.Router();

const emailController = require('../controllers/emailController');

router.post('/subscribe', emailController.subscribe);

module.exports = router;