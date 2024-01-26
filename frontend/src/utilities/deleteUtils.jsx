import { useEffect } from "react";
import axios from "axios";

export const useDeleteProduct = () => {
  const deleteProductRequest = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/printify/products/delete-hardcoded"
      );
      console.log("Product deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    deleteProductRequest();
  }, []);

  return { deleteProductRequest };
};
