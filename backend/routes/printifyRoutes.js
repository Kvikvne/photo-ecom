const express = require('express');
const printifyApi = require('../services/printifyService');

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const products = await printifyApi.getProducts();
    console.log('Printify API Response:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Printify:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
