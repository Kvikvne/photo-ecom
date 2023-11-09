import css from "./Prints.module.css";
import PrintItem from "./PrintItem";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Prints() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1>Canvas Prints</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      {products.map((product, index) => (
        <PrintItem
          key={product._id}
          id={product.id}
          thumb={product.thumb}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
}
