import React, { useState } from "react";
import VariantSelect from "./VariantSelect";
import css from "./Styles/ProductImages.module.css";
import ProductDetails from "./ProductDetails";

const ProductImages = ({
  product,
  productId,
  selectedVariants,
  handleVariantChange,
  productIndex,
  filteredProducts,
  photo,
}) => {
  const [clickedImg, setClickedImg] = useState();

  const handleImageClick = (imageSrc) => {
    setClickedImg(imageSrc);
  };

  const currentVariant = parseInt(selectedVariants[productId]?.variantId, 10);
  const selectedImages = filteredProducts[0]?.images.filter(
    (image) =>
      image.is_selected_for_publishing === true &&
      image.variant_ids.includes(currentVariant)
  );

  return (
    <div className={css.outer}>
      <ProductDetails
        selectedVariants={selectedVariants}
        selectedImages={selectedImages}
        clickedImg={clickedImg}
        product={product}
      />
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
              <img
                onClick={() => handleImageClick(image.src)}
                src={image.src}
                alt=""
              />
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
