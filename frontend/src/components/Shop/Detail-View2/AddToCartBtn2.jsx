import axios from "axios";
import css from "./Styles/Addtocartbtn2.module.css";
import Checkmark from "../../Loaders/Checkmark";
import { useState } from "react";

export default function AddToCartBtn2({ cartInfo }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (cartInfo.sku.trim() === "") {
      setLoading(true);
      alert("No variant is selected. Please select a variant.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // API endpoint to handle adding to the cart
      await axios.post("http://localhost:3000/cart/add", cartInfo, {
        withCredentials: true,
      });

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      // Handle errors
      alert("Error adding product to cart:", error);
    }
  };

  return (
    <div className={css.btn} onClick={handleAddToCart}>
      <p>{loading ? <Checkmark /> : "Add to Cart"}</p>
    </div>
  );
}
