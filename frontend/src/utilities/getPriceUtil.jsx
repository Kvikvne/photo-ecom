import axios from "axios";
import { useState } from "react"; 

const REQ_URL = import.meta.env.VITE_UTIL

export const useStripe = () => {
  const [priceId, setPriceId] = useState(null);

  const itemPrice = async (sku) => {
      try {
          const response = await axios.get(
              `${REQ_URL}/stripe/products/search`,
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
