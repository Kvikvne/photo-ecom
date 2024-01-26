import React, { useState } from "react";
import GalleryModal from "./GalleryModal";
import css from "./Styles/Gallery.module.css";

const imagePaths = [
  "./IMG_1370.jpg",
  "./IMG_6374.jpg",
  "./IMG_7310.JPG",
  "./IMG_2532_COPY_EDIT.jpg",
  "./IMG_4847.jpg",
  "./IMG_5060.JPG",
  "./IMG_5881.jpg",
  "./IMG_5963.jpg",
  "./IMG_6247.jpg",
  "./IMG_7622.jpg",
  "./IMG_8219.jpg",
  "./IMG_9061.jpg",
  "./IMG_9082.jpg",
  "./IMG_9088.jpg",
  "./IMG_9277.jpg",
  "./IMG_9278.jpg",
  "./IMG_9486.jpg",
];

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imagePath) => {
    setIsModalOpen(true);
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.title}>
          <h1>Collection</h1>
        </div>

        <div className={css.btnContainer}>
          <a href="/prints">
            <button className={css.btn}>Shop prints</button>
          </a>
        </div>
      </div>

      <div className={css.wrapper}>
        <div className={css.Gallerygrid}>
          {imagePaths.map((imagePath, index) => (
            <img
              key={index}
              src={imagePath}
              alt={`Image ${index}`}
              onClick={() => openModal(imagePath)}
              className={css.gridItem}
            />
          ))}
        </div>
      </div>
      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imagePath={selectedImage}
      />
    </div>
  );
}
