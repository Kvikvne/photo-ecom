import React from "react";
import VariantSelect from "./VariantSelect";
import css from "./Styles/ProductImages.module.css";

const ProductImages = ({
  product,
  productId,
  selectedVariants,
  handleVariantChange,
  productIndex,
  filteredProducts,
  photo
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
            <div className={css.productImg} key={imageIndex}>
              <img src={image.src} alt="" />
            </div>
          ))}
      </div>
      <VariantSelect
        product={product}
        productId={productId}
        selectedVariants={selectedVariants}
        handleVariantChange={handleVariantChange}
        productIndex={productIndex}
        filteredProducts={filteredProducts}
        photo={photo}
      />
    </div>
  );
};

export default ProductImages;
