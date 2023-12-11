const express = require('express');
const printifyApi = require('../services/printifyService');


const router = express.Router();

// Get an array of printify products
router.get('/products', async (req, res) => {
  try {
    const products = await printifyApi.getProducts();
    // console.log('Printify API Response:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Printify:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get uploaded images
router.get('/images', async (req, res) => {
  try {
    const images = await printifyApi.getImages();
    // console.log('Printify API Response:', images);
    res.json(images);
  } catch (error) {
    console.error('Error fetching images from Printify:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








// ----------------------------- DELETE PRODUCT CAREFULL!!! --------------------------------------------------------------------------

router.delete("/products/delete-hardcoded", async (req, res) => {
  try {
    const product_id = "656fca9f00dda535c806fad6";
    const result = await printifyApi.deleteProduct(product_id);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error deleting product from Printify store:", error);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

module.exports = router;
