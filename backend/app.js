const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db/connection");
const routes = require("./routes");
const cartModel = require("./db/models/cartModel"); 


const stripe = require('stripe')('SECRET_KEY');


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
    const { id, product_id, variant_id, sku, quantity, variant_label, price, img, name, description } =
      req.body;


    // Use the cart model to interact with the cart collection
    await cartModel.addToCart(
      id,
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







app.post("/checkout", async (req, res) => {

  /*
 req.body.items
 [
     {
         id: 1,
         quantity: 3
     }
 ]

 stripe wants
 [
     {
         price: 1,
         quantity: 3
     }
 ]
 */

 console.log(req.body);
 const items = req.body.items;
 let lineItems = [];
 items.forEach((item)=> {
     lineItems.push(
         {
             price: item.line_items[0].id,
             quantity: item.line_items[0].quantity
         }
     )
 });

 const session = await stripe.checkout.sessions.create({
     line_items: lineItems,
     mode: 'payment',
     success_url: "http://localhost:5173/",
     cancel_url: "http://localhost:5173/prints"
 });

 res.send(JSON.stringify({
     url: session.url
 }));
});