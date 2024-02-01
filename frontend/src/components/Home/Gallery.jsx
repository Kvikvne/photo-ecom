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

const images = [
  {
    path: "./IMG_6374.jpg",
    id: "6573d2578f6758c6d8097283",
  },
  {
    path: "./IMG_4847.jpg",
    id: "65a7192d23373c467702019d",
  },
  {
    path: "./IMG_5963.jpg",
    id: "65a717f45c6a08ca8f0f0f3a",
  },
  {
    path: "./IMG_6374.jpg",
    id: "6573d2578f6758c6d8097283",
  },
  {
    path: "./IMG_4847.jpg",
    id: "65a7192d23373c467702019d",
  },
  {
    path: "./IMG_5963.jpg",
    id: "65a717f45c6a08ca8f0f0f3a",
  },
  {
    path: "./IMG_6374.jpg",
    id: "6573d2578f6758c6d8097283",
  },
  {
    path: "./IMG_4847.jpg",
    id: "65a7192d23373c467702019d",
  },
  {
    path: "./IMG_5963.jpg",
    id: "65a717f45c6a08ca8f0f0f3a",
  },
  {
    path: "./IMG_6374.jpg",
    id: "6573d2578f6758c6d8097283",
  },
  {
    path: "./IMG_4847.jpg",
    id: "65a7192d23373c467702019d",
  },
  {
    path: "./IMG_5963.jpg",
    id: "65a717f45c6a08ca8f0f0f3a",
  },
];

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageId, setSelectedImageId] = useState("");

  const openModal = (imagePath, imageId) => {
    setIsModalOpen(true);
    setSelectedImage(imagePath);
    setSelectedImageId(imageId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div id="collection" className={css.container}>
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
          {images.map((image, index) => (
            <img
              key={index}
              src={image.path}
              alt={`Image ${index}`}
              onClick={() => openModal(image.path, image.id)}
              className={css.gridItem}
            />
          ))}
        </div>
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imagePath={selectedImage}
        imageId={selectedImageId}
      />
    </div>
  );
}
