import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCartContent = () => {
  const [cartContent, setCartContent] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = () => {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => setCartContent(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/remove/${itemId}`);
      // After a successful deletion, update the cart
      updateCart();
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
    }
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
      if (item.line_items && item.line_items.length > 0 && item.line_items[0].metadata) {
        const itemPrice = parseFloat(item.line_items[0].metadata.price);
        calculatedTotal += !isNaN(itemPrice) ? itemPrice : 0;
      }
    });
    setTotal(calculatedTotal.toFixed(2)); // Round the total to 2 decimal places
  }, [cartContent]);

  return { cartContent, total, updateCart, deleteCartItem };
};
