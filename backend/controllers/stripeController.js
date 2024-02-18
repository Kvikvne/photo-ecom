require("dotenv").config({ path: ".env.dev" });

// Import necessary modules
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Define a controller function
const searchProducts = async (req, res) => {
    const { sku } = req.query; // Extract sku from query parameters
    console.log('controller: ', sku)
  try {
    // Perform the search operation using the Stripe SDK
    const stripeProducts = await stripe.prices.search({
        query: `active:'true' AND metadata['sku']:'${sku}'`,
    });

    // Return the products in the response
   
    res.json(stripeProducts);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the controller function for use in your routes
module.exports = { searchProducts };
