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

const getOrders = async () => {
  try {
    const response = await axios.get(
      "https://api.printify.com/v1/shops/12652066/orders.json",
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

const publishProduct = async (product_id) => {
  try {
    const shop_id = "12652066";
    const response = await axios.post(
      `https://api.printify.com/v1/shops/12652066/products/65c55cb2833a332c6d0bc39a/publishing_succeeded.json`, // Corrected endpoint
      {
        "external": {
            "id": "65c54e726a56e47eba094950",
            "handle": "https://example.com/path/to/product"
        }
    },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error in publish Product:",
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

const cancelOrder = async (shop_order_id) => {
  try {
    const response = await axios.post(
      `https://api.printify.com/v1/shops/12652066/orders/${shop_order_id}/cancel.json`,
      null, 
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
      "Error in cancelOrder:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

module.exports = { getProducts, deleteProduct, shippingCost, getOrders, cancelOrder, publishProduct };
