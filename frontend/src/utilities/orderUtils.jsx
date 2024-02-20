import { useState, useEffect } from "react";
import axios from "axios";

const REQ_URL = import.meta.env.VITE_UTIL;

export const usePrintifyOrders = () => {
  const [printifyOrders, setPrintifyOrders] = useState([]);
  const [mongoOrders, setMongoOrders] = useState([]);

  const fetchPrintifyOrders = async () => {
    try {
      const response = await axios.get(`${REQ_URL}/api/printify/orders`, {
        withCredentials: true,
      });
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

  const cancelOrder = async (shop_order_id, paymentIntentId) => {
    console.log("util payment intent", paymentIntentId)
    try {
      // Cancel the order
      const cancelResponse = await axios.post(
        `${REQ_URL}/api/printify/cancel-order`,
        { shop_order_id },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If cancelation is successful, initiate refund
      if (cancelResponse.status === 200) {
       
        const refundResponse = await axios.post(
          `${REQ_URL}/stripe/refund-request`,
          { paymentIntentId }, 
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle refund response as needed
        console.log("Refund response:", refundResponse.data);
        return refundResponse.data;
      }
      return cancelResponse.data;

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
