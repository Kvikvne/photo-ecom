import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/Shop/Detail-View/ProductDetails";
import ProductImages from "../components/Shop/Detail-View/ProductImages";
import css from "./Styles/Store2.module.css";
import { usePhotos } from "../utilities/photosUtils";
import { usePrintify } from "../utilities/printifyUtils";

export default function Store2() {
  const [selectedVariants, setSelectedVariants] = useState({});
  const { productId } = useParams();
  const { mainPhoto } = usePhotos()
  const { printifyProducts } = usePrintify()

  
  const handleVariantChange = (productId, value) => {
    const [variantId, sku, price, title] = value.split(",");

    setSelectedVariants({
      ...selectedVariants,
      [productId]: {
        variantId,
        sku,
        price,
        title,
      },
    });
  };

  // Filter the products array based on the productId
  const filteredProducts = printifyProducts.data
    ? printifyProducts.data.filter(
        (product) => product.id.toString() === productId
      )
    : [];

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product, productIndex) => (
            <div className={css.productCard} key={productIndex}>
              <ProductDetails product={product} mainPhoto={mainPhoto} />

              <div>
                <ProductImages
                  product={product}
                  productId={productId}
                  selectedVariants={selectedVariants}
                  handleVariantChange={handleVariantChange}
                  productIndex={productIndex}
                  filteredProducts={filteredProducts}
                  photo={mainPhoto}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No matching product found</p>
        )}
      </div>
    </div>
  );
}
