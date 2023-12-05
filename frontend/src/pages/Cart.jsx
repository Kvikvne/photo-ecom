import css from "./Styles/Cart.module.css";
import React from "react";
import CartTotal from "../components/Shop/Cart/CartTotal";
import { useCartContent } from "../utilities/cartUtils";

export default function Cart() {
  const { cartContent, total } = useCartContent();
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
                  <div className={css.itemImg}>
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
