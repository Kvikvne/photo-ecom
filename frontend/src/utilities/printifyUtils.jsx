import { useState, useEffect } from "react";
import axios from "axios";

const REQ_URL = import.meta.env.VITE_UTIL

const TAGS = ["Canvas", ""]

export const usePrintify = () => {
  const [printifyProducts, setPrintifyProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${REQ_URL}/api/printify/products`,
        { withCredentials: true }
      );
      setPrintifyProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false)
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

  return { printifyProducts, shippingCost, loading };
};
