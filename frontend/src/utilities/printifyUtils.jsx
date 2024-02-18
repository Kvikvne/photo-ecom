import { useState, useEffect } from "react";
import axios from "axios";

const REQ_URL = import.meta.env.VITE_UTIL

export const usePrintify = () => {
  const [printifyProducts, setPrintifyProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${REQ_URL}/api/printify/products`,
        { withCredentials: true }
      );
      setPrintifyProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shippingCost = async (formattedData) => {
    try {
      const response = await axios.post(
        `${REQ_URL}/api/printify/calculate-shipping`,
        formattedData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error in shippingCost:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  return { printifyProducts, shippingCost };
};
