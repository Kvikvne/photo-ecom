import { useState, useEffect } from "react";
import css from "./Styles/ProductImages2.module.css";

// Modal component
const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default function ProductImages2({
  filteredProducts,
  availibleImages,
  variantFilter,
}) {
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState("");
  // State to track whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to update selectedImage when variantFilter changes
  useEffect(() => {
    // Update selectedImage when variantFilter changes
    setSelectedImage(
      variantFilter && variantFilter.length > 0
        ? variantFilter[variantFilter.length - 1].src
        : ""
    );
  }, [variantFilter]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.ProductImagescontainer}>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((product, productIndex) => (
          <div key={productIndex}>
            <div className={css.mainImageContainer}>
              {/* Main photo */}
              <img
                src={selectedImage || product.images[product.images.length - 1].src}
                alt=""
                onClick={openModal}
              />
            </div>

            <div className={css.imgScrollContainer}>
              <div className={css.ImgContainer}>
                {variantFilter &&
                  Array.isArray(variantFilter) &&
                  variantFilter.map((image, imgIndex) => (
                    // photolist
                    <img
                      key={imgIndex}
                      src={image.src}
                      alt=""
                      onClick={() => setSelectedImage(image.src)}
                    />
                  ))}
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <Modal imageUrl={selectedImage} onClose={closeModal} />
            )}
          </div>
        ))
      ) : (
        <p>No matching product found</p>
      )}
    </div>
  );
}
