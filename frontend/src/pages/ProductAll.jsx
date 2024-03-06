import css from "./Styles/ProductAll.module.css";
import React from "react";
import ProductCard from "../components/Shop/All-View/ProductCard";
import { usePrintify } from "../utilities/printifyUtils";
import AllLoadingState from "../components/Loaders/AllLoadingState";
import { useDeleteProduct } from "../utilities/deleteUtils";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProductAll = () => {
  // Fetch printify products
  const { printifyProducts } = usePrintify();
  // Get tag parameter from URL
  const { tag } = useParams();
  // Extract products data or set empty array if data is unavailable
  const products = printifyProducts.data || [];

  // Define category names for different tags
  const categoryNames = {
    Poster: "Acrylic prints",
    Canvas: "Art & Wall Decor",
    Accessories: "Accessories",
    all: "All products",
  };

  const categoryHeaders = {
    Poster: "Acrylic prints",
    Canvas:
      "Transform Your Space with Inspired prints: Elevate Your Home's Aesthetic with Our Stunning Selection. We currently offer our prints in both canvas and acrylic options.",
    iPhone: "Phone cases",
    all: "All products",
  };

  return (
    <div>
      {/* Helmet for setting page title */}
      <Helmet>
        <title>{categoryNames[tag] || ""} | KVIKVNE Photography</title>
      </Helmet>

      {/* Header with category name */}
      <div className={css.container2}>
        <h1>{categoryNames[tag] || ""}</h1>
        <p className={css.headerP}>
          {categoryHeaders[tag]}
        </p>
      </div>

      {/* Container for displaying products */}
      <div className={css.container}>
        {/* Show loading state if products are not available */}
        {products.length === 0 &&
          Array.from({ length: 12 }).map((_, index) => (
            <AllLoadingState key={index} />
          ))}

        {/* Map through products and render product cards */}
        {products.map((product, index) => {
          // Filter enabled variants
          const enabledVariants = product.variants.filter(
            (variant) => variant.is_enabled
          );
          // Find minimum enabled price
          const minEnabledPrice = enabledVariants.reduce(
            (minPrice, variant) => Math.min(minPrice, variant.price),
            Infinity
          );

          // Find default image for the product
          let defaultImg = product.images.filter((image) => image.is_default);
          defaultImg = defaultImg[defaultImg.length - 1].src;

          // Render product card if it matches the selected tag or if tag is 'all'
          if (tag === "all" || product.tags.includes(tag)) {
            return (
              <div key={index}>
                <ProductCard
                  cardPhoto={defaultImg}
                  title={product.title}
                  variant={
                    enabledVariants[0].title
                      .replace(' / 1.25"', "")
                      .replace(" (Horizontal) / Glossy", "")
                      .replace(" (Vertical) / Glossy", "")
                      .replace(" / Matte", "") +
                    " to " +
                    enabledVariants[enabledVariants.length - 1].title
                      .replace(' / 1.25"', "")
                      .replace(" (Horizontal) / Glossy", "")
                      .replace(" (Vertical) / Glossy", "")
                      .replace(" / Matte", "")
                  }
                  cardDescription={product.description
                    .replace(/<p>/g, "")
                    .replace(/<\/p>/g, "")}
                  price={minEnabledPrice / 100}
                  productId={product.id}
                  tag={product.tags}
                  products={products}
                />
              </div>
            );
          }
          // Return null if product doesn't match the tag
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductAll;
