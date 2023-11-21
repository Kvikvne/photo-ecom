import React from "react";
import VariantSelect from "./VariantSelect";
import css from "./Styles/ProductImages.module.css";

const ProductImages = ({
  product,
  selectedVariants,
  handleVariantChange,
  productIndex,
}) => {
  return (
    <div className={css.outer}>
      <div className={css.container}>
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
      <VariantSelect
        product={product}
        selectedVariants={selectedVariants}
        handleVariantChange={handleVariantChange}
        productIndex={productIndex}
      />
    </div>
  );
};

export default ProductImages;
