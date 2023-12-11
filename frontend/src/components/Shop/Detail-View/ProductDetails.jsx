import React from "react";
import css from "./Styles/ProductDetails.module.css";

const ProductDetails = ({ product, clickedImg, selectedImages }) => {
  let defaultImg = product.images.filter((image) => image.is_default);
  defaultImg = defaultImg[defaultImg.length - 1].src;

  let variantImage = selectedImages[selectedImages.length - 1]?.src;
  

  return (
    <div className={css.container}>
      <h2>{product.title}</h2>
      <div className={css.content}>
        <div className={css.mainPhoto}>
        {variantImage ? (
            <img src={variantImage} alt="" />
            
          ) : (
            <img src={defaultImg} alt="" />
          ) ||  <img src={clickedImg} alt="" />}
         
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
