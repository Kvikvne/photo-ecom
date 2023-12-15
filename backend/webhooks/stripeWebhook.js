const { v4: uuidv4 } = require("uuid");
const { getDb } = require("../db/connection");
const axios = require('axios');

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (request, response) => {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    console.error("Webhook Error:", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionComplete = event.data.object;
      const session_id = checkoutSessionComplete.id;
      const line_items = await stripe.checkout.sessions.listLineItems(
        session_id
      );

      // Extract product IDs from line items
      const productIds = line_items.data.map((item) => item.price.product);

      // Fetch detailed product information
      const productDetails = await Promise.all(
        productIds.map((productId) => stripe.products.retrieve(productId))
      );

      // Create an order document by combining cart data and webhook payload
      const orderDocument = {
        external_id: uuidv4(),
        label: productDetails[0].metadata.label,
        line_items: [
          {
            sku: productDetails[0].metadata.sku,
            quantity: line_items.data[0].quantity,
          },
        ],
        shipping_method: 1,
        is_printify_express: false,
        send_shipping_notification: true,
        address_to: {
          first_name:
            checkoutSessionComplete.customer_details.name.split(" ")[0],
          last_name:
            checkoutSessionComplete.customer_details.name.split(" ")[1],
          email: checkoutSessionComplete.customer_details.email,
          phone: checkoutSessionComplete.customer_details.phone,
          country: checkoutSessionComplete.shipping_details.address.country,
          region: checkoutSessionComplete.shipping_details.address.state,
          address1: checkoutSessionComplete.shipping_details.address.line1,
          address2: checkoutSessionComplete.shipping_details.address.line2,
          city: checkoutSessionComplete.shipping_details.address.city,
          zip: checkoutSessionComplete.shipping_details.address.postal_code,
        },
      };
      // Insert the order document into the "orders" collection
      await insertOrderDocument(orderDocument);

      // Send the order to Printify
      await postOrderToPrintify(orderDocument);

      console.log("Order created: ", orderDocument);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
// Function to insert order document into the MongoDB collection
async function insertOrderDocument(orderDocument) {
  try {
    const db = getDb();
    const collection = db.collection("orders");

    await collection.insertOne(orderDocument);
    console.log("Order inserted into MongoDB");
  } catch (error) {
    console.error("Error inserting order into MongoDB:", error);
  }
}
// Function to send the order to Printify
async function postOrderToPrintify(orderDocument) {
  try {
    const { PRINTIFY_SHOP_ID, PRINTIFY_TOKEN } = process.env;

    // Replace the following URL with the actual Printify endpoint
    const printifyEndpoint = `https://api.printify.com/v1/shops/${PRINTIFY_SHOP_ID}/orders.json`;

    // Prepare the data for the Printify API request
    const printifyData = orderDocument;

    // Make the HTTP POST request to Printify
    const printifyResponse = await axios.post(printifyEndpoint, printifyData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRINTIFY_TOKEN}`,
      },
    });

    console.log('Order sent to Printify:', printifyResponse.data);
  } catch (error) {
    console.error('Error sending order to Printify:', error);
  }
}
module.exports = handleStripeWebhook;
