const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db/connection");
const cartRoutes = require('./routes/cart'); 
const indexRoutes = require('./routes/index');
const printifyRoutes = require('./routes/printifyRoutes');
const checkoutRoutes = require('./routes/checkout'); 
const cartModel = require("./db/models/cartModel");
const handleStripeWebhook = require("./webhooks/stripeWebhook");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

let db;

// Connect to the MongoDB database
connectToDb("mongodb://127.0.0.1:27017/photoWebsite", async (err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  // Get the database instance
  db = getDb();

  // Acess 'cart' collection 
  const cartCollection = db.collection("cart");

  // Set the collection in cartModel
  cartModel.setCollection(cartCollection);

  // Start the Express app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Middleware
app.use(cors());

// webhook route
app.use('/webhook', express.raw({ type: 'application/json' }));
app.post("/webhook", handleStripeWebhook);

// json Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/printify', printifyRoutes);
app.use("/", indexRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes); 

