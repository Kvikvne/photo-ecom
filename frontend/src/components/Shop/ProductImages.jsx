import React from "react";

const ProductImages = ({ product, selectedVariants }) => {
  return (
    <div
    style={{
      color: "black",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    {product.images
      .filter((image) =>
        selectedVariants[product.id]
          ? image.variant_ids.includes(
              parseInt(selectedVariants[product.id].variantId)
            )
          : true
      )
      .map((image, imageIndex) => (
        <div key={imageIndex}>
          <img style={{ width: "100px" }} src={image.src} alt="" />
        </div>
      ))}
  </div>
  );
};

export default ProductImages;