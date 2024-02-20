const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const initiateCheckout = async (req, res) => {
  try {
    // passed data
    const items = req.body.items;
    const shippingCost = req.body.shippingCost;
    const deliveryData = req.body.deliveryData;
    // Get sessionID from the request
    const userSessionId = req.sessionID;
    
    
    // Gets product info and pushes it to the Stripe session
    let lineItems = [];
    items.forEach((item) => {
      lineItems.push({
        price: item.line_items[0].id,
        quantity: item.line_items[0].quantity,
      });
    });


    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",

      line_items: lineItems,

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingCost,
              currency: "usd",
            },

            display_name: "Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 10,
              },
            },
          },
        },
      ],

      mode: "payment",
      success_url: "http://192.168.1.104:5173/checkout-success",
      cancel_url: "http://192.168.1.104:5173/cart",


      // Passes the shipping data collected before stripe session to the web hook
      metadata: {
        line1: deliveryData.address1,
        line2: '',
        state: '',
        city: deliveryData.city,
        postal_code: deliveryData.zip,
        country: deliveryData.country,
        name: deliveryData.first_name + " " + deliveryData.last_name,
        phone: deliveryData.phone,
        email: deliveryData.email,
        sessionId: userSessionId
      },
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error initiating checkout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { initiateCheckout };
