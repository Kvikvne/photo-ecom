import css from "./Styles/Cart.module.css";
import React from "react";
import CartTotal from "../components/Shop/Cart/CartTotal";
import { useCartContent } from "../utilities/cartUtils";
import { useDeleteProduct } from "../utilities/deleteUtils";

export default function Cart() {
  const { cartContent, total, deleteCartItem } = useCartContent();

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCartItem(itemId),{ withCredentials: true };
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
    }
  };

  const checkout = async () => {
    await fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartContent }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  };

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
                  <div className={css.itemDetailList}>
                    <div className={css.itemDesc}>
                      <h3>{item.line_items[0].metadata.name}</h3>
                    </div>

                    <div className={css.cartItemDetail}>
                      <div className={css.spacer}></div>

                      <p>Size: {item.line_items[0].metadata.variant_label}</p>
                      <p>Quantity: {item.line_items[0].quantity}</p>
                    </div>
                    <p className={css.price}>
                      ${item.line_items[0].metadata.price}
                    </p>
                  </div>

                  <div
                    className={css.delete}
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    &times;
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CartTotal checkout={checkout} totalPrice={total} />
      </div>
    </div>
  );
}
