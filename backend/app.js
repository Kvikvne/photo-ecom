// app.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db/connection");
const routes = require("./routes");
const cartModel = require("./db/models/cartModel"); 

 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);


let db;

// Connect to the MongoDB database
connectToDb("mongodb://127.0.0.1:27017/photoWebsite", async (err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  // Get the database instance
  db = getDb();

  // Assuming 'cart' is your collection name
  const cartCollection = db.collection("cart");

  // Set the collection in cartModel
  cartModel.setCollection(cartCollection);

  // Start the Express app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the API" });
});

app.get("/photos", async (req, res) => {
  let photos = [];

  db.collection("photos")
    .find()
    .sort({ id: 1 })
    .forEach((photo) => photos.push(photo))
    .then(() => {
      res.status(200).json(photos);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch items" });
    });
});

// Add the cart routes
app.post("/api/cart/add", async (req, res) => {
  try {
    // Extract product data from the request body
    const { product_id, variant_id, sku, quantity, variant_label, price, img, name, description } =
      req.body;


    // Use the cart model to interact with the cart collection
    await cartModel.addToCart(
      product_id,
      quantity,
      variant_id,
      price,
      variant_label,
      sku,
      img,
      name,
      description
    );

    // Send a success response
    res.status(200).json({ message: "Item added to the cart successfully" });
  } catch (error) {
    console.error("Error adding item to the cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const cartItems = await cartModel.getCartItems();
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Stripe

const stripe = require('stripe')('SECRET_KEY');

app.get('/secret', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10099,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create PaymentIntent' });
  }
});