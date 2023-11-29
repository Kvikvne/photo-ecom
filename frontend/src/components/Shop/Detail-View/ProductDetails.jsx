import React from "react";
import css from "./Styles/ProductDetails.module.css";

const ProductDetails = ({ product, mainPhoto }) => {
  return (
    <div className={css.container}>
      <h2>{product.title}</h2>
      {mainPhoto
        .filter((photo) => photo.productId === product.id)
        .map((photo) => (
          <div className={css.content} key={photo.productId}>
            <div className={css.mainPhoto}>
              <img src={`/${photo.thumb}`} alt="" />
            </div>
            <p>{product.description}</p>
          </div>
        ))}
    </div>
  );
};

export default ProductDetails;
