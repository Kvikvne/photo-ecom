import css from "./Styles/ProductAll.module.css";
import React from "react";
import ProductCard from "../components/Shop/All-View/ProductCard";
import { usePrintify } from "../utilities/printifyUtils";
import AllLoadingState from "../components/Loaders/AllLoadingState";

const ProductAll = () => {
  const { printifyProducts } = usePrintify();
  const products = printifyProducts.data || [];
  
  return (
    <div>
      <div className={css.container2}>
        <h1>Canvas Prints</h1>
      </div>
      <div className={css.container}>
        {products.length === 0 &&
          Array.from({ length: 5 }).map((_, index) => (
            <AllLoadingState key={index} />
          ))}

        {products.map((product, index) => {
          const enabledVariants = product.variants.filter(
            (variant) => variant.is_enabled
          );
          const minEnabledPrice = enabledVariants.reduce(
            (minPrice, variant) => Math.min(minPrice, variant.price),
            Infinity
          );

          let defaultImg = product.images.filter((image) => image.is_default);
          defaultImg = defaultImg[defaultImg.length - 1].src;

          return (
            <div key={index}>
              <ProductCard
                cardPhoto={defaultImg}
                title={product.title}
                variant={
                  enabledVariants[0].title.replace(' / 1.25"', "") +
                  " to " +
                  enabledVariants[2].title.replace(' / 1.25"', "")
                }
                cardDescription={product.description
                  .replace(/<p>/g, "")
                  .replace(/<\/p>/g, "")}
                price={minEnabledPrice / 100}
                productId={product.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductAll;
