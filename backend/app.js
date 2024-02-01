const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db/connection");
const cartRoutes = require('./routes/cart'); 
const indexRoutes = require('./routes/index');
const printifyRoutes = require('./routes/printifyRoutes');
const checkoutRoutes = require('./routes/checkout'); 
const cartModel = require("./db/models/cartModel");
const handleStripeWebhook = require("./webhooks/stripeWebhook");
const { v4: uuidv4 } = require('uuid');
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.get('/test-session', (req, res) => {
  const sessionID = req.sessionID;
  res.json({ sessionID });
});

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


app.use(cookieParser());
// webhook route
app.use('/webhook', express.raw({ type: 'application/json' }));
app.post("/webhook", handleStripeWebhook);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    genid: (req) => {
      console.log('*** User session created ***')
      return req.sessionID || uuidv4();
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/photoWebsite',
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

// json Middleware
app.use(bodyParser.json());


// // Routes
app.use('/api/printify', printifyRoutes);
app.use("/", indexRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes); 
