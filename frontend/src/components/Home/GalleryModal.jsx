import css from "./Styles/GalleryModal.module.css";

export default function GalleryModal({ isOpen, onClose, imagePath }) {
  if (!isOpen) return null;

  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent}>
        <img src={imagePath} alt="Modal" />
      </div>
    </div>
  );
}
