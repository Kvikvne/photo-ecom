import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCartContent = () => {
  const [cartContent, setCartContent] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart")
      .then((response) => setCartContent(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    let calculatedTotal = 0;
    cartContent.forEach((item) => {
      calculatedTotal += item.line_items[0].metadata.price / 100;
    });
    setTotal(calculatedTotal);
  }, [cartContent]);

  return { cartContent, total };
};