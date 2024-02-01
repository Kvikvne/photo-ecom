require("dotenv").config();

const TOKEN = process.env.PRINTIFY_TOKEN;

const axios = require("axios");

// Get an array of products from printify
const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://api.printify.com/v1/shops/12652066/products.json",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a product from printify
const deleteProduct = async (product_id) => {
  try {
    const shop_id = "12652066";
    const response = await axios.delete(
      `https://api.printify.com/v1/shops/${shop_id}/products/${product_id}.json`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteProduct:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Calculate shipping cost
const shippingCost = async (formattedData) => {
  try {
    const response = await axios.post(
      "https://api.printify.com/v1/shops/12652066/orders/shipping.json",
      formattedData,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error in shippingCost:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

module.exports = { getProducts, deleteProduct, shippingCost };
