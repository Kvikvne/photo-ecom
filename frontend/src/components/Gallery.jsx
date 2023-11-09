import React, { useState } from 'react';
import GalleryModal from './GalleryModal';
import css from './Gallery.module.css';

const imagePaths = [
  './IMG_1370.jpg',
  './IMG_6374.jpg',
  './IMG_7310.JPG',
  './IMG_1370.jpg',
  './IMG_6374.jpg',
  './IMG_7310.JPG',
  './IMG_1370.jpg',
  './IMG_6374.jpg',
  './IMG_7310.JPG',
  './IMG_1370.jpg',
  './IMG_6374.jpg',
  './IMG_7310.JPG',
];

export default function Gallery() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
  
    const openModal = (imagePath) => {
      setIsModalOpen(true);
      setSelectedImage(imagePath);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedImage('');
    };
  
    return (
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.title}>
            <h1>Collection</h1>
          </div>
          <div className={css.Gallerygrid}>
            {imagePaths.map((imagePath, index) => (
              <img
                key={index}
                src={imagePath}
                alt={`Image ${index}`}
                onClick={() => openModal(imagePath)}
              />
            ))}
          </div>
        </div>
        <GalleryModal isOpen={isModalOpen} onClose={closeModal} imagePath={selectedImage} />
      </div>
  );
}
