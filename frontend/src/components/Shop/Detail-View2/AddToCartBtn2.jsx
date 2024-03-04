import axios from "axios";
import css from "./Styles/Addtocartbtn2.module.css";
import Checkmark from "../../Loaders/Checkmark";
import { useState } from "react";

const REQ_URL = import.meta.env.VITE_UTIL;

export default function AddToCartBtn2({ cartInfo }) {
  const [loading, setLoading] = useState(false);
  const [isSelection, setIsSelection] = useState(true);

  const handleAddToCart = async () => {
    setIsSelection(true);
    if (cartInfo === null) {
      setIsSelection(false);

      return;
    }
    try {
      setLoading(true);
      // API endpoint to handle adding to the cart
      await axios.post(`${REQ_URL}/cart/add`, cartInfo, {
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
    <>
      <div className={css.btn} onClick={handleAddToCart}>
        <p>{loading ? <Checkmark /> : "Add to Cart"}</p>
      </div>
      {!isSelection && <p className={css.error}>please select a size</p>}
    </>
  );
}
