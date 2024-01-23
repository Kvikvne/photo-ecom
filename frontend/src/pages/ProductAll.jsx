import css from "./Styles/ProductAll.module.css";
import React from "react";
import ProductCard from "../components/Shop/All-View/ProductCard";
import { usePrintify } from "../utilities/printifyUtils";

const ProductAll = () => {
  const { printifyProducts } = usePrintify();
  const products = printifyProducts.data || [];

  return (
    <div>
      <div className={css.container2}>
        <h1>Canvas Prints</h1>
      </div>
      <div className={css.container}>
        {products.length === 0 && <div>No products found.</div>}
        {products.map((product, index) => {
          const minEnabledPrice = product.variants
            .filter((variant) => variant.is_enabled)
            .reduce((minPrice, variant) => Math.min(minPrice, variant.price), Infinity);

          let defaultImg = product.images.filter((image) => image.is_default);
          defaultImg = defaultImg[defaultImg.length - 1].src;

          return (
            <ProductCard
              key={index}
              cardPhoto={defaultImg}
              title={product.title}
              cardDescription={product.description.replace(/<p>/g, '').replace(/<\/p>/g, '')}
              price={minEnabledPrice / 100}
              productId={product.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductAll;
