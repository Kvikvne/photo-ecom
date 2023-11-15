
const express = require('express');
const printifyApi = require('./printifyApi');

const router = express.Router();

router.get('/printify/products', async (req, res) => {
  try {
    const products = await printifyApi.getProducts();
    console.log('Printify API Response:', products); // Log the actual response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Printify:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;