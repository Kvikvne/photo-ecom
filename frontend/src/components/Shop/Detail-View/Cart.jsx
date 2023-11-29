import css from "./Styles/Cart.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cartContent, setCartContent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart")
      .then((response) => setCartContent(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);


  
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.cartCard}>
          <div className={css.cartHeader}>
            <h2>Your Cart</h2>
          </div>
          <div className={css.cartContent}>
          {cartContent.map((item, index) => (
          <p key={index}>
            <img src={item.line_items[0].metadata.img} alt="" /> <br />
            ${item.line_items[0].metadata.price / 100} <br />
            Size: {item.line_items[0].metadata.variant_label} <br />
            quantity: {item.line_items[0].quantity}
          </p>
          
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
