import React, { useState } from "react";
import axios from "axios";
import css from "./Styles/Addtocartbtn.module.css";

const AddToCartBtn = ({ productId, variantId, sku, title, price, selectedImage }) => {

  const imgSrc = selectedImage?.src

  const handleAddToCart = async () => {
    try {
      console.log({
        product_id: productId,
        quantity: 1,
        variant_id: variantId,
        price: price,
        variant_label: title,
        sku: sku,
        img: imgSrc,
      });
      // Assuming you have an API endpoint to handle adding to the cart
      const response = await axios.post("http://localhost:3000/api/cart/add", {
        product_id: productId,
        quantity: 1,
        variant_id: variantId,
        price: price,
        variant_label: title,
        sku: sku,
        img: imgSrc,
      });

      // Assuming the API responds with the updated cart data
      const updatedCart = response.data;

      // Callback to notify parent component (e.g., update the UI)
      // onSuccess(updatedCart);

      // You can also show a success message or trigger other actions here
      console.log("Product added to cart successfully");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className={css.btn} onClick={handleAddToCart}>
      <p>Add to Cart</p>
    </div>
  );
};

export default AddToCartBtn;
