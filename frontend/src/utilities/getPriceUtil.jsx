import axios from "axios";
import { useState } from "react"; 

export const useStripe = () => {
  const [priceId, setPriceId] = useState(null);

  const itemPrice = async (sku) => {
      try {
          const response = await axios.get(
              "http://localhost:3000/stripe/products/search",
              {
                  params: { sku },
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          );
          setPriceId(response.data);
          return response.data;
      } catch (error) {
          console.error(
              "Error in getPrice:",
              error.response ? error.response.data : error.message
          );
          throw error;
      }
  };

  return { itemPrice, priceId }; // Return priceId
};
