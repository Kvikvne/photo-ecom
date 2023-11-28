import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import css from "./Styles/Store2.module.css";

export default function Store2() {
  const { productId } = useParams(); 
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
    const [variantId, sku, price, cost, title] = value.split(",");

    setSelectedVariants({
      ...selectedVariants,
      [productId]: {
        variantId,
        sku,
        price,
        cost,
        title,
      },
    });
  };

  // Filter the products array based on the productId
  const filteredProducts = printifyProducts.data ? printifyProducts.data.filter(
    (product) => product.id.toString() === productId
  ) : [];

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
                  selectedVariants={selectedVariants}
                  handleVariantChange={handleVariantChange}
                  productIndex={productIndex}
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
