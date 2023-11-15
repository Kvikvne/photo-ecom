import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Testing() {
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

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantId,
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
              <h2>{product.title}</h2>
              {mainPhoto
                .filter((photo) => photo.id === product.id)
                .map((photo, index) => (
                  <img style={{ width: "400px" }} src={photo.thumb} alt="" />
                ))}
              <p>{product.id}</p>
              <p>{product.description}</p>
              <select
                onChange={(e) =>
                  handleVariantChange(product.id, e.target.value)
                }
                value={selectedVariants[product.id] || ""}
              >
                <option value="" disabled>
                  Select Variant
                </option>
                {product.variants
                  ?.filter((variant) => variant.is_enabled === true)
                  .map((variant, variantIndex) => (
                    <option
                      key={`${productIndex}-${variantIndex}`}
                      value={variant.id}
                    >
                      {variant.title}
                    </option>
                  ))}
              </select>
              <div
                style={{
                  color: "black",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {product.images
                  .filter((image) =>
                    selectedVariants[product.id]
                      ? image.variant_ids.includes(
                          parseInt(selectedVariants[product.id])
                        )
                      : true
                  )
                  .map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <img style={{ width: "100px" }} src={image.src} alt="" />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
