import React, { useState } from "react";
import GalleryModal from "./GalleryModal";
import css from "./Styles/Gallery.module.css";


const images = [
  {
    path: "./IMG_6374_edit.JPG",
    id: "6573d2578f6758c6d8097283",
  },
  {
    path: "./IMG_4847_edit.JPG",
    id: "65a7192d23373c467702019d",
  },
  {
    path: "./IMG_5963_edit.JPG",
    id: "65a717f45c6a08ca8f0f0f3a",
  },
  {
    path: "./IMG_9088.jpg",
    id: "65c55f164ba9341a6d081ef4",
  },

  {
    path: "./IMG_4955_edit.JPG",
    id: "65c55b04688e99f9a001907b",
  },
  {
    path: "./IMG_6247_edit.JPG",
    id: "65c559ec511eb82d320116fa",
  },
  {
    path: "./IMG_5868_edit.JPG",
    id: "65c55855800827daf10c139f",
  },

  {
    path: "./IMG_5929_edit.JPG",
    id: "65c552364d795c018c0c9a9e",
  },
  {
    path: "./IMG_5881_edit.JPG",
    id: "65c5508098398742140348fd",
  },
  {
    path: "./IMG_4847_edit.JPG",
    id: "65c54e726a56e47eba094950",
  },
  {
    path: "./IMG_5770_edit.JPG",
    id: "65c556ece943e035240e3e8e",
  },
  {
    path: "./IMG_9486.jpg",
    id: "65c55cb2833a332c6d0bc39a",
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
