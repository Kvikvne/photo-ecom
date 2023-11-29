import css from "./Styles/Cart.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CartTotal from "./CartTotal";

export default function Cart() {
  const [cartContent, setCartContent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart")
      .then((response) => setCartContent(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  let total = 0;
  cartContent.forEach((item) => (total += item.line_items[0].metadata.price / 100));

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.cartCard}>
          <div className={css.cartHeader}>
            <h2>Your Cart</h2>
          </div>
          {cartContent.length === 0 ? (
            <p className={css.emptyCartMessage}>Your cart is empty.</p>
          ) : (
            <div className={css.cartContent}>
              {cartContent.map((item, index) => (
                <div className={css.itemCard} key={index}>
                  <div>
                    <img src={item.line_items[0].metadata.img} alt="" />
                  </div>
                  <div className={css.itemDesc}>
                    <h3>{item.line_items[0].metadata.name}</h3>
                    <p>{item.line_items[0].metadata.description}</p>
                  </div>

                  <div className={css.cartItemDetail}>
                    <div className={css.spacer}></div>

                    <p>Size: {item.line_items[0].metadata.variant_label}</p>
                    <p>Quantity: {item.line_items[0].quantity}</p>
                  </div>
                  <p className={css.price}>${(item.line_items[0].metadata.price / 100).toFixed(2) }</p>
                  <div className={css.delete}>&times;</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CartTotal totalPrice={total.toFixed(2)} />
      </div>
    </div>
  );
}
