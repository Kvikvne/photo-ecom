import css from "./Styles/NavCart.module.css";
import React from "react";
import { useCartContent } from "../../utilities/cartUtils";

export default function NavCart() {
  const { cartContent, total } = useCartContent();

  return (
    <div className={css.cartDownMenu}>
      <h2>Cart</h2>
      <a href="/cart">View Cart</a>
      <p>Subtotal: ${total}</p>
      <div className={css.cartItems}>
        <div className={css.cartCard}>
          {cartContent.length === 0 ? (
            <p className={css.emptyCartMessage}>Your cart is empty.</p>
          ) : (
            <div className={css.cartContent}>
              {cartContent.map((item, index) => (
                <a className={css.anchor} href="/cart">
                  <div className={css.itemCard} key={index}>
                    <div className={css.itemDesc}>
                      <h3>{item.line_items[0].metadata.name}</h3>
                    </div>
                    <div>
                      <img src={item.line_items[0].metadata.img} alt="" />
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
                      ${item.line_items[0].metadata.price }
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
