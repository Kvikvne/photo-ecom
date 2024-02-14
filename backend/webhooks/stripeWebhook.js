const { v4: uuidv4 } = require("uuid");
const { getDb } = require("../db/connection");
const axios = require("axios");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (request, response) => {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
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

      // Retrieve all line items from the session
      const line_items = await stripe.checkout.sessions.listLineItems(
        session_id
      );

      // Extract product IDs and quantities from all line items
      const lineItemsData = line_items.data.map((item) => ({
        price_id: item.price.id,
        quantity: item.quantity,
      }));

      // Fetch detailed product information for each price
      const productDetails = await Promise.all(
        lineItemsData.map((lineItem) =>
          stripe.prices.retrieve(lineItem.price_id)
        )
      );

      // Create an order document for each product
      const orderDocument = {
        session_id: checkoutSessionComplete.metadata.sessionId,
        external_id: uuidv4(),
        shipping_method: 1,
        is_printify_express: false,
        send_shipping_notification: true,
        line_items: [],
        address_to: {
          first_name: checkoutSessionComplete.metadata.name.split(" ")[0],
          last_name: checkoutSessionComplete.metadata.name.split(" ")[1],
          email: checkoutSessionComplete.customer_details.email,
          phone: checkoutSessionComplete.customer_details.phone,
          country: checkoutSessionComplete.metadata.country,
          region: checkoutSessionComplete.metadata.state,
          address1: checkoutSessionComplete.metadata.line1,
          address2: checkoutSessionComplete.metadata.line2,
          city: checkoutSessionComplete.metadata.city,
          zip: checkoutSessionComplete.metadata.postal_code,
        },
      };

      // Append line items for each product
      productDetails.forEach((product, index) => {
        for (let i = 0; i < lineItemsData[index].quantity; i++) {
          orderDocument.line_items.push({
            sku: product.metadata.sku,
            quantity: 1,
          });
        }
      });


      // Send each order to Printify and insert into MongoDB
      const printifyResponseData = await postOrderToPrintify(orderDocument);
      await insertOrderDocument(orderDocument, printifyResponseData);


      // Remove cart items associated with the user's session ID
      await removeCartItemsBySessionId(
        checkoutSessionComplete.metadata.sessionId
      );

      console.log("Orders created:", orderDocument);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
async function removeCartItemsBySessionId(sessionId) {
  try {
    const db = getDb();
    const cartCollection = db.collection("cart");

    // Delete cart items for the given session ID
    await cartCollection.deleteMany({ "line_items.sessionID": sessionId });

    console.log("Cart items removed for session:", sessionId);
  } catch (error) {
    console.error("Error removing cart items:", error);
  }
}
// Function to insert order document into the MongoDB collection
async function insertOrderDocument(orderDocument, printifyResponseData) {
  try {
    const db = getDb();
    const collection = db.collection("orders");
    orderDocument.printifyResponse = printifyResponseData;
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

    // Printify endpoint
    const printifyEndpoint = `https://api.printify.com/v1/shops/${PRINTIFY_SHOP_ID}/orders.json`;

    // Prepare the data for the Printify API request
    const printifyData = orderDocument;

    // Make the HTTP POST request to Printify
    const printifyResponse = await axios.post(printifyEndpoint, printifyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PRINTIFY_TOKEN}`,
      },
    });
    /////// Return this value to insertOrderDocument ////////

    console.log("Order sent to Printify:", printifyResponse.data);
    return printifyResponse.data;
  } catch (error) {
    console.error("Error sending order to Printify:", error);
  }
}
module.exports = handleStripeWebhook;
