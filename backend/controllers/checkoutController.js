const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const initiateCheckout = async (req, res) => {
  try {
    const items = req.body.items;
    // console.log(' ITmes',items[0].line_items)
    let lineItems = [];


    
    items.forEach((item) => {
      lineItems.push({
        price: item.line_items[0].id,
        quantity: item.line_items[0].quantity,
        
      });
    });
    
    let shipping_options = [];
    items.forEach((item) => {
      shipping_options.push({
        shipping_rate: item.line_items[0].shipping,
      });
    });

  
    const session = await stripe.checkout.sessions.create({
      phone_number_collection: {
        enabled: true
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: lineItems,
      shipping_options: shipping_options,
      mode: "payment",
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173/cart",
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
