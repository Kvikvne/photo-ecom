const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db/connection");
const cartRoutes = require("./routes/cart");
const indexRoutes = require("./routes/index");
const printifyRoutes = require("./routes/printifyRoutes");
const checkoutRoutes = require("./routes/checkout");
const orderRoutes = require("./routes/orders");
const cartModel = require("./db/models/cartModel");
const orderModel = require("./db/models/orderModel");
const stripeRoutes = require("./routes/stripe");
const handleStripeWebhook = require("./webhooks/stripeWebhook");
const { v4: uuidv4 } = require("uuid");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// Middleware
const corsOptions = {
  origin: "https://ecom-frontend-test.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

let db;

// Connect to the MongoDB database
connectToDb(process.env.MONGO_URI, async (err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  // Get the database instance
  db = getDb();

  // Acess 'cart' collection
  const cartCollection = db.collection("cart");
  const ordersCollection = db.collection("orders");

  // Set the collection in cartModel
  cartModel.setCollection(cartCollection);
  orderModel.setCollection(ordersCollection);

  // Start the Express app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// webhook route
app.use("/webhook", express.raw({ type: "application/json" }));
app.post("/webhook", handleStripeWebhook);

// json Middleware
app.use(bodyParser.json());

// non session generating routes
app.use("/api/printify/", printifyRoutes);
app.use("/", indexRoutes);
app.use("/stripe", stripeRoutes);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    genid: (req) => {
      console.log("*** User session created ***");
      return req.sessionID || uuidv4();
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // Session TTL in seconds (optional)
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (30 days)
      secure: true, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "none", // Optional: enforce strict same-site policy
      domain: "ecom-backend-test-ur3x.onrender.com",
    },
  })
);

// Session generating Routes
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
