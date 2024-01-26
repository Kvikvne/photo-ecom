const cartModel = require("../db/models/cartModel");

const addToCart = async (req, res) => {
  try {
    // Extract product data from the request body
    const {
      id,
      shipping,
      product_id,
      variant_id,
      sku,
      quantity,
      variant_label,
      price,
      img,
      name,
      description,
      print_provider_id,
      blueprint_id
    } = req.body;

    // Get sessionID from the request
    const sessionID = req.sessionID;

    // Check if the item already exists in the cart for the given sessionID
    const existingItem = await cartModel.findCartItem(
      sessionID,
      product_id,
      variant_id
    );

    if (existingItem) {
      await cartModel.updateCartItemQuantity(
        existingItem._id,
        existingItem.line_items[0].quantity + quantity,
        existingItem.sessionID
      );

     
    } else {
      // If the item doesn't exist, add a new item to the cart
      await cartModel.addToCart(
        sessionID,
        id,
        shipping,
        product_id,
        quantity,
        variant_id,
        price,
        variant_label,
        sku,
        img,
        name,
        description,
        print_provider_id,
        blueprint_id
      );

      // Fetch updated cart items and send the response
      const updatedCartItems = await cartModel.getCartItems(sessionID);
      res.status(200).json({
        message: "Item added to the cart successfully",
        cartItems: updatedCartItems,
      });
    }
  } catch (error) {
    console.error("Error adding item to the cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const sessionID = req.sessionID;

  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Update the quantity in your database
    await cartModel.updateCartItemQuantity(itemId, quantity, sessionID);

    res.status(200).json({ message: "Item quantity updated successfully" });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartItems = async (req, res) => {
  const sessionID = req.sessionID;

  try {
    const cartItems = await cartModel.getCartItems(sessionID);
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    // Extract the item ID from the request parameters
    const itemId = req.params.itemId; // Adjust based on your route configuration

    // Use the cart model to delete the item from the cart collection
    const deletedItem = await cartModel.deleteCartItem(itemId);

    if (!deletedItem) {
      // If the item with the specified ID is not found, return a 404 response
      return res.status(404).json({ error: "Item not found in the cart" });
    }

    // Send a success response
    res.json({ message: "Item deleted from the cart successfully" });
  } catch (error) {
    console.error("Error deleting item from the cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  deleteCartItem,
  updateCartItemQuantity,
};
