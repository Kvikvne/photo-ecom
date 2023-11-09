import css from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import Addtocartbtn from "./Addtocartbtn";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [frames, setFrames] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState("");
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error:", error));
    axios
      .get("http://localhost:3000/frames")
      .then((response) => setFrames(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  const frameOptions = frames.map((frame) => (
    <option key={frame.id} value={frame.text}>
      {frame.text}
    </option>
  ));


  const selectedFrameObject = frames.find(
    (frame) => frame.text === selectedFrame
  );
  const price = selectedFrameObject ? selectedFrameObject.price : 0;
  const frameSize = selectedFrameObject ? selectedFrameObject.size : 0;
    
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
                onChange={(e) => setSelectedFrame(e.target.value)}
              >
                <option value="">Select Frame</option>
                {frameOptions}
              </select>
            </div>
            <div className={css.spacer}></div>
            <Addtocartbtn />
          </div>
        </div>
        <p>price: {price}</p>
        <p>size: {frameSize}</p>
        <p>Image: ID-{product.id}</p>
        <div className={css.product}>
          <img src={product.thumb} alt={product.title} />
        </div>
      </div>
    </div>
  );
}
