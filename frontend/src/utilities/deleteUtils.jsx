import { useEffect } from "react";
import axios from "axios";
const REQ_URL = import.meta.env.VITE_UTIL
export const useDeleteProduct = () => {
  // const deleteProductRequest = async () => {
  //   try {
  //     const response = await axios.delete(
  //       "http://localhost:3000/api/printify/products/delete-hardcoded"
  //     );
  //     console.log("Product deleted successfully:", response.data);
  //   } catch (error) {
  //     console.error(
  //       "Error deleting product:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // useEffect(() => {
  //   deleteProductRequest();
  // }, []);

  const publishProductRequest = async () => {
    try {
      const response = await axios.post(
        `"${REQ_URL}/api/printify/products/publish"`
      );
      console.log("Product published successfully:", response.data);
    } catch (error) {
      console.error(
        "Error publishing product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    publishProductRequest();
  }, []);
  return {  publishProductRequest };
};
