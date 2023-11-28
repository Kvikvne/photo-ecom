import css from "./Styles/ProductAll.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductAll() {
  const [mainPhoto, setMainPhoto] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos")
      .then((response) => setMainPhoto(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className={css.container}>
      {mainPhoto.map((photo, index) => (
        <ProductCard
          key={index}
          cardPhoto={photo.thumb}
          title={photo.title}
          cardDescription={photo.description}
          price={photo.price}
          productId={photo.productId}
        />
      ))}
    </div>
  );
}
