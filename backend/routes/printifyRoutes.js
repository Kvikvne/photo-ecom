//printifyRoutes.js
const express = require("express");
const printifyApi = require("../services/printifyService");

const router = express.Router();

// Get an array of printify products
router.get("/products", async (req, res) => {
  try {
    const products = await printifyApi.getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products from Printify:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await printifyApi.getOrders();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders from Printify:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------- DELETE PRODUCT CAREFULL!!! --------------------------------------------------------------------------

// router.delete("/products/delete-hardcoded", async (req, res) => {
//   try {
//     const product_id = "6573d2578f6758c6d8097283";
//     const result = await printifyApi.deleteProduct(product_id);
//     res.status(200).json(result);
//   } catch (error) {
//     console.log("Error deleting product from Printify store:", error);
//     res.status(500).json({ error: "Internal server error occurred" });
//   }
// });

router.post("/products/publish", async (req, res) => {
  try {
    const product_id = "65c53b0224b6d9777f0ffb58";
    const result = await printifyApi.publishProduct(product_id);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error publishing product to Printify store:", error);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});
// Route to handle shipping cost calculation

router.post("/calculate-shipping", async (req, res) => {
  try {
    const formattedData = req.body; // Assuming the formatted data is sent in the request body
    const shippingCostResult = await printifyApi.shippingCost(formattedData);
    res.json(shippingCostResult);
  } catch (error) {
    console.error("Error in shipping cost calculation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/cancel-order", async (req, res) => {
  try {
    const { shop_order_id } = req.body; 
    const orderCancelRes = await printifyApi.cancelOrder( shop_order_id); 
    console.log('route:', shop_order_id),
    res.json(orderCancelRes);
  } catch (error) {
    console.error("Error in cancel-order route: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
