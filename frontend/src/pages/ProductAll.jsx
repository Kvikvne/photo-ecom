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

  const products_data = [];

  console.log(products_data);
  return (
    <div>
      {/* Helmet for setting page title */}
      <Helmet>
        <title>{categoryNames[tag] || ""} | KVIKVNE Photography</title>
      </Helmet>

      {/* Header with category name */}
      <div className={css.container2}>
        <h1>{categoryNames[tag] || ""}</h1>
        <p className={css.headerP}>{categoryHeaders[tag]}</p>
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


          // if (tag === "all" || product.tags.includes(tag)) {
          //   let newData = {
          //     id: enabledVariants[0].sku,
          //     title: product.title,
          //     description: product.description.replace(/<p>/g, "").replace(/<\/p>/g, ""),
          //     availability: "in_stock",
          //     link:`https://www.kvikvne.com${product.external.handle}`,
          //     "image link": defaultImg,
          //     price: enabledVariants[0].price / 100,
          //     "identifier exists": "no",
          //     gtin: "",
          //     mpn: "",
          //     brand: "Kvikvne",
          //     "product highlight": 'canvas prints , photography, wall art, home decor',
          //     "product detail": "Print Type: Canvas, Print Type: Acrylic",
          //     "additional image link": "",
          //     condition: "new",
          //     adult: "no",
          //     color: '',
          //     size: enabledVariants[0].title,
          //     gender: "",
          //     material: "100% cotton canvas, optically clear acrylic",
          //     pattern: "",
          //     "age group": "",
          //     multipack: "",
          //     "is bundle": "",
          //     "unit pricing measure": "",
          //     "unit pricing base measure": "",
          //     "energy efficiency class": "",
          //     "min energy efficiency class": "",
          //     "item group id": "",
          //     "sell on google quantity": "",
              

              
              
          //   };

          //   // Push the new data object into the products_data array
          //   products_data.push(newData);
          // }

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
