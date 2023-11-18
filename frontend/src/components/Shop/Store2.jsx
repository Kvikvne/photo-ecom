import React, { useState, useEffect } from "react";
import AddToCartBtn from "./Addtocartbtn";
import axios from "axios";
import ProductDetails from "./ProductDetails";
import VariantSelect from "./VariantSelect";
import ProductImages from "./ProductImages";

export default function Store2() {
  const [printifyProducts, setPrintifyProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [mainPhoto, setMainPhoto] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/printify/products"
      );
      setPrintifyProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos")
      .then((response) => setMainPhoto(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleVariantChange = (productId, value) => {
    const [variantId, sku, price] = value.split(",");

    setSelectedVariants({
      ...selectedVariants,
      [productId]: {
        variantId,
        sku,
        price,
      },
    });
  };

  return (
    <div>
      <div
        style={{
          padding: "50px",
          color: "black",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {Array.isArray(printifyProducts.data) ? (
          printifyProducts.data.map((product, productIndex) => (
            <div key={productIndex}>
              <ProductDetails product={product} mainPhoto={mainPhoto} />
              <p>${selectedVariants[product.id]?.price / 100 || 0}</p>
              <div>
                <AddToCartBtn
                  productId={product.id}
                  variantId={
                    selectedVariants[product.id]
                      ? selectedVariants[product.id].variantId
                      : ""
                  }
                  sku={
                    selectedVariants[product.id]
                      ? selectedVariants[product.id].sku
                      : ""
                  }
                />
              </div>
              <VariantSelect
                product={product}
                selectedVariants={selectedVariants}
                handleVariantChange={handleVariantChange}
                productIndex={productIndex}
              />

              <ProductImages
                product={product}
                selectedVariants={selectedVariants}
              />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
