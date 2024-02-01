import React from "react";
import { useTransition, animated } from "@react-spring/web";
import css from "./Styles/GalleryModal.module.css";

export default function GalleryModal({ isOpen, onClose, imagePath, imageId }) {
  const modalTransition = useTransition(isOpen, {
    config: { mass: 5, tension: 2000, friction: 200 },
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
  });

  return modalTransition(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className={css.modalBackdrop}
          onClick={onClose}
        >
          {isOpen && (
            <div className={css.modalContent}>
              <img src={imagePath} alt="Modal" />
              <div className={css.btnContainer}>
                <a href={`/prints/${imageId}`}>
                  <button>Buy this print</button>
                </a>
              </div>
            </div>
          )}
        </animated.div>
      )
  );
}
