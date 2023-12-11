import css from "./Styles/CartView.module.css";
import React from "react";
import { useCartContent } from "../../../utilities/cartUtils";

export default function CartView() {
  const { cartContent, total } = useCartContent();

  return (
    <div className={css.container}>
      <div className={css.itemContainer}>
        {cartContent.map((item, index) => (
          <div className={css.itemCard} key={index}>
            <div className={css.imgContainer}>
              <img src={item.line_items[0].metadata.img} alt="" />
            </div>
            <div className={css.itemDesc}>
              <h3>{item.line_items[0].metadata.name}</h3>
              <p> ${item.line_items[0].metadata.price}</p>
              <p>Size: {item.line_items[0].metadata.variant_label}</p>
              <p>Quantity: {item.line_items[0].quantity}</p>
            </div>
            
          </div>
        ))}
      </div>
      <div className={css.total}>
        <h3>Subtotal: ${total}</h3>
      </div>
      
    </div>
  );
}
