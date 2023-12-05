import css from "./Styles/ProductAll.module.css";
import React from "react";
import ProductCard from "../components/Shop/All-View/ProductCard";
import { usePhotos } from "../utilities/photosUtils";

export default function ProductAll() {
  const { mainPhoto } = usePhotos()

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
