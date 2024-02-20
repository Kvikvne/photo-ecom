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
    setTimeout(() => {
    fetchPrintifyOrders();
  }, 2000);
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
    setTimeout(() => {
      fetchMongoOrders();
    }, 2000);
  }, []);

  return { printifyOrders, mongoOrders };
};