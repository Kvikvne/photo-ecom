import { useState, useEffect } from "react";
import css from "./Styles/ProductImages2.module.css";

export default function ProductImages2({
  filteredProducts,
  availibleImages,
  variantFilter,
}) {
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState("");

  // Effect to update selectedImage when variantFilter changes
  useEffect(() => {
    // Update selectedImage when variantFilter changes
    setSelectedImage(
      variantFilter && variantFilter.length > 0
        ? variantFilter[variantFilter.length - 1].src
        : ""
    );
  }, [variantFilter]);

  return (
    <div className={css.ProductImagescontainer}>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((product, productIndex) => (
          <div key={productIndex}>
            
            
            <div className={css.mainImageContainer}>
              {/* Main photo */}
              <img src={selectedImage || product.images[4].src} alt="" />
            </div>


            <div className={css.imgScrollContainer}>
              <div className={css.ImgContainer}>
                {variantFilter &&
                  Array.isArray(variantFilter) &&
                  variantFilter.map((image, imgIndex) => (
                    // photolist
                    <img
                      key={imgIndex}
                      src={image.src}
                      alt=""
                      onClick={() => setSelectedImage(image.src)}
                    />
                  ))}
              </div>
            </div>


            
          </div>
        ))
      ) : (
        <p>No matching product found</p>
      )}
    </div>
  );
}
