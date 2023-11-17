import React, { useState, useEffect } from "react";
import AddToCartBtn from "./Addtocartbtn";
import axios from "axios";

export default function Testing() {
  const [printifyProducts, setPrintifyProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [mainPhoto, setMainPhoto] = useState([]);

  // varibles needed to order a new item
  // {
  //   "external_id": "2750e210-39bb-11e9-a503-452618153e4a",
  //   "label": "00012",
  //   "line_items": [
  //     {
  //       "product_id": "5bfd0b66a342bcc9b5563216",
  //       "variant_id": 17887,
  //       "quantity": 1
  //     }
  //   ],
  //   "shipping_method": 1,
  //   "is_printify_express": false,
  //   "send_shipping_notification": false,
  //   "address_to": {
  //     "first_name": "John",
  //     "last_name": "Smith",
  //     "email": "example@msn.com",
  //     "phone": "0574 69 21 90",
  //     "country": "BE",
  //     "region": "",
  //     "address1": "ExampleBaan 121",
  //     "address2": "45",
  //     "city": "Retie",
  //     "zip": "2470"
  //   }
  // }

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
    const [variantId, sku] = value.split(",");

    setSelectedVariants({
      ...selectedVariants,
      [productId]: {
        variantId,
        sku,
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
                value={
                  selectedVariants[product.id]
                    ? `${selectedVariants[product.id].variantId},${
                        selectedVariants[product.id].sku
                      }`
                    : ""
                }
              >
                <option value="" disabled>
                  Select Variant
                </option>
                {product.variants
                  ?.filter((variant) => variant.is_enabled === true)
                  .map((variant, variantIndex) => (
                    <option
                      key={`${productIndex}-${variantIndex}`}
                      value={`${variant.id},${variant.sku}`}
                    >
                      {variant.title}
                    </option>
                  ))}
              </select>

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
