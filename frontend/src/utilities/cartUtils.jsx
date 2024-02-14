import { useState, useEffect } from "react";
import axios from "axios";

export const useCartContent = () => {
  const [cartContent, setCartContent] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchCart = () => {
    axios
      .get("https://api.kvikvne.com/cart", { withCredentials: true })
      .then((response) => {
        setCartContent(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(`https://api.kvikvne.com/cart/remove/${itemId}`, {
        withCredentials: true,
      });
      // After a successful deletion, update the cart
      updateCart();
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
    }
  };

  const calculateTotalQuantity = () => {
    let calculatedTotalQuantity = 0;
    cartContent.forEach((item) => {
      if (item.line_items && item.line_items.length > 0) {
        calculatedTotalQuantity += item.line_items[0].quantity || 0;
      }
    });
    setTotalQuantity(calculatedTotalQuantity);
  };

  const updateCart = () => {
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let calculatedTotal = 0;
    cartContent.forEach((item) => {
      if (
        item.line_items &&
        item.line_items.length > 0 &&
        item.line_items[0].metadata
      ) {
        const itemPrice = parseFloat(
          item.line_items[0].metadata.price * item.line_items[0].quantity
        );
        calculatedTotal += !isNaN(itemPrice) ? itemPrice : 0;
      }
    });
    setTotal(calculatedTotal.toFixed(2));
    calculateTotalQuantity(); // Call the new function to calculate total quantity
  }, [cartContent]);

  return { cartContent, total, totalQuantity, updateCart, deleteCartItem };
};
