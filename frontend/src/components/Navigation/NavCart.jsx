import css from "./Styles/NavCart.module.css";
import React, { useState, useEffect } from "react";
import { useCartContent } from "../../utilities/cartUtils";


export default function NavCart() {
  const { cartContent, total, totalQuantity } = useCartContent();

  return (
    <div className={css.cartDownMenu}>
      <h2>Cart</h2>
      <div className={css.cartDropHeader}>
        <span>
          {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
        </span>
        <p>Subtotal: ${total}</p>
      </div>

      <div>
        <div className={css.cartItems}>
          <div className={css.cartCard}>
            {cartContent.length === 0 ? (
              <p className={css.emptyCartMessage}>Your cart is empty.</p>
            ) : (
              <div className={css.cartContent}>
                {cartContent.map((item, index) => (
                  <a className={css.anchor} href="/cart" key={index}>
                    <div className={css.itemCard}>
                      <div>
                        <img src={item.line_items[0].metadata.img} alt="" />
                      </div>
                      <div className={css.itemDesc}>
                        <h3>{item.line_items[0].metadata.name}</h3>
                      </div>
                      <div className={css.cartItemDetail}>
                        <div className={css.spacer}></div>

                        <p>
                          <span>Size:</span>{" "}
                          {item.line_items[0].metadata.variant_label}
                        </p>
                        <p>
                          <span>Quantity:</span> {item.line_items[0].quantity}
                        </p>
                      </div>
                      <p className={css.price}>
                        ${item.line_items[0].metadata.price}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={css.viewCart}>
          <a href="/cart">
            <p>View Cart</p>
          </a>
        </div>
      </div>
    </div>
  );
}
