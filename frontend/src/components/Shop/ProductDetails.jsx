import React from "react";

const ProductDetails = ({
  product,
  mainPhoto,
}) => {
  return (
    <div>
      <h2>{product.title}</h2>
      {mainPhoto
        .filter((photo) => photo.id === product.id)
        .map((photo, index) => (
          <img
            key={index}
            style={{ width: "400px" }}
            src={photo.thumb}
            alt=""
          />
        ))}
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
