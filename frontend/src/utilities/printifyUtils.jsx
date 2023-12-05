import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePrintify = () => {
    const [printifyProducts, setPrintifyProducts] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/printify/products"
          );
          setPrintifyProducts(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      return { printifyProducts };
}