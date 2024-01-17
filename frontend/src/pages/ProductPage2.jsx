import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import css from "./Styles/ProductPage2.module.css";
import { usePrintify } from "../utilities/printifyUtils";
import VariantSelect2 from "../components/Shop/Detail-View2/VariantSelect2";
import ProductImages2 from "../components/Shop/Detail-View2/ProductImages2";
import AddToCartBtn2 from "../components/Shop/Detail-View2/AddToCartBtn2";

export default function ProductPage2() {
  const { productId } = useParams();
  const { printifyProducts } = usePrintify();

  const [selectedVariant, setSelectedVariant] = useState(null);

  // Product Images logic------------------------------------
  // Filter the products array based on the productId
  const filteredProducts = useMemo(() => {
    return printifyProducts.data
      ? printifyProducts.data.filter(
          (product) => product.id.toString() === productId
        )
      : [];
  }, [printifyProducts.data, productId]);

  const availibleImages = useMemo(() => {
    return (
      filteredProducts[0]?.images.filter(
        (image) => image.is_selected_for_publishing === true
      ) || []
    );
  }, [filteredProducts]);

  // filter based on selected variant
  const variantFilter = selectedVariant
    ? availibleImages?.filter(
        (image) => image?.variant_ids[0].toString() === selectedVariant
      )
    : [];

  // Variant select logic------------------------------------
  const availibleVariants = filteredProducts[0]?.variants.filter(
    (variant) => variant.is_enabled === true
  );

  // cart and product information --------------------------------
  const productInfo = availibleVariants?.filter(
    (variant) => variant.id.toString() === selectedVariant
  );

  const price = (productInfo?.[0]?.price / 100 || 0).toFixed(2);
  const title = productInfo?.[0]?.title || "";
  const sku = productInfo?.[0]?.sku || "";
  const imgSrc = variantFilter?.[variantFilter.length - 1]?.src || "";
  const name = filteredProducts?.[0]?.title || "";
  const description = (filteredProducts?.[0]?.description || "")
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "")
    .replace(/<br\s*\/><br\s*\/>/g, "");
  const priceId =
    sku === "19209890069376927152" ? "price_1OLHA8DJK1tIdvkfBqXSzo8l" : "";
  const shippingId =
    sku === "19209890069376927152" ? "shr_1OMKyBDJK1tIdvkfeXHkLmmV" : "";

  const cartInfo = {
    id: priceId,
    shipping: shippingId,
    product_id: productId,
    quantity: 1,
    variant_id: selectedVariant,
    price: price,
    variant_label: title,
    sku: sku,
    img: imgSrc,
    name: name,
    description: description,
  };

  return (
    <div className={css.productContainer}>
      <div className={css.productCard}>
        <div className={css.productImagesContainer}>
          <ProductImages2
            productId={productId}
            filteredProducts={filteredProducts}
            availibleImages={availibleImages}
            variantFilter={variantFilter}
          />
        </div>

        <div className={css.productInfo}>
          <div className={css.name}>
            <h2>{name}</h2>
          </div>
          <div className={css.description}>
            <p>{description}</p>
          </div>
          <div className={css.bottom}>
            <div className={css.variantContainer}>
              <VariantSelect2
                onSelectVariant={(variant) => setSelectedVariant(variant)}
                availibleVariants={availibleVariants}
              />
            </div>
            <div className={css.addToCart}>
              <p>${price}</p>
              <AddToCartBtn2 cartInfo={cartInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
