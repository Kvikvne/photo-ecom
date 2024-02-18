import { useState, useEffect } from "react";
import axios from "axios";

const REQ_URL = import.meta.env.VITE_UTIL

export const usePrintifyOrders = () => {
  const [printifyOrders, setPrintifyOrders] = useState([]);
  const [mongoOrders, setMongoOrders] = useState([]);

  const fetchPrintifyOrders = async () => {
    try {
      const response = await axios.get(
        `${REQ_URL}/api/printify/orders`,
        { withCredentials: true }
      );
      setPrintifyOrders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPrintifyOrders();
  }, []);

  const fetchMongoOrders = async () => {
    try {
      const response = await axios.get(`${REQ_URL}/orders`, {
        withCredentials: true,
      });
      setMongoOrders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMongoOrders();
  }, []);

  const cancelOrder = async (shop_order_id) => {
    try {
      const response = await axios.post(
        `${REQ_URL}/api/printify/cancel-order`,
        { shop_order_id }, 
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
        "Error in cancelOrder util:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  


  return { printifyOrders, mongoOrders, cancelOrder };
};
