import css from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import Addtocartbtn from "./Addtocartbtn";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [frames, setFrames] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState("");
  const [price, setPrice] = useState(0); // New state for the price
  const [frameSize, setFrameSize] = useState(0); // New state for the frame size
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const [printifyProducts, setPrintifyProducts] = useState([]);

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
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error:", error));

  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  const frameOptions =
    printifyProducts.data && printifyProducts.data.length > 0
      ? printifyProducts.data[0].variants
          ?.filter((variant) => variant.is_enabled === true)
          .map((variant, index) => (
            <option key={index} value={variant.title}>
              {variant.title}
            </option>
          ))
      : null;

  const handleFrameSelection = (selectedVariantTitle) => {
    const selectedVariant = printifyProducts.data[0].variants.find(
      (variant) => variant.title === selectedVariantTitle
    );

    setSelectedFrame(selectedVariantTitle);
    setPrice(selectedVariant ? selectedVariant.price : 0);
    setFrameSize(selectedVariant ? selectedVariant.size : 0);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={css.wrapper}>
        <div className={css.info}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className={css.spacer}></div>
          <div>images</div>
          <div className={css.spacer}></div>

          <div className={css.bottom}>
            <p>${price}</p>
            <div className={css.options}>
              <select
                name="frame"
                id="frame"
                onChange={(e) => handleFrameSelection(e.target.value)}
              >
                <option value="">Select Frame</option>
                {frameOptions}
              </select>
            </div>
            <div className={css.spacer}></div>
            <Addtocartbtn />
          </div>
        </div>

        <div className={css.product}>
          <img src={product.thumb} alt={product.title} />
        </div>
      </div>
      {/* {printifyProducts.data && printifyProducts.data.length > 0 && (
        <div className={css.printifyProducts}>
          <h2>Title: {printifyProducts.data[0].title}</h2>
          <p>Variants:</p>
          {printifyProducts.data[0].variants &&
          printifyProducts.data[0].variants.length > 0
            ? printifyProducts.data[0].variants
                .filter((variant) => variant.is_enabled === true)
                .map((variant, index) => (
                  <div key={index}>
                    <p>Size: {variant.title}</p>
                    <p>Price: {variant.price}</p>
                    <p>ID: {variant.id}</p>
                  </div>
                ))
            : "No variants available"}
        </div>
      )} */}
    </div>
  );
};

export default ProductPage;
