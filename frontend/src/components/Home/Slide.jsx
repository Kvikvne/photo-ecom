import React, { useState, useEffect } from "react";
import css from "./Styles/Slide.module.css";

const featured = [
  {
    title: "Painted Sky",
    path: "./painted-skySlide.jpg",
    product: "/products/Canvas/65c55f164ba9341a6d081ef4",
  },
  {
    title: "Oceanic",
    path: "./oceanicSlide.jpg",
    product: "/products/Canvas/65c53b0224b6d9777f0ffb58",
  },
  {
    title: "Marine Leap",
    path: "./marine-leapSlide.jpg",
    product: "/products/Canvas/65c55cb2833a332c6d0bc39a",
  },
  {
    title: "Emerald",
    path: "./emeraldSlide.jpg",
    product: "/products/Canvas/65c54e726a56e47eba094950",
  },
  {
    title: "Family",
    path: "./familySlide.jpg",
    product: "/products/Canvas/65c5535bc55f04117f02cd7b",
  },
];

export default function Slide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(goToNext, 8000); // Cycle every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]); // Restart the interval when currentIndex changes

  const goToPrevious = () => {
    setFade(true); // Trigger fade animation
    setTimeout(() => {
      setFade(false); // Reset fade after animation completes
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? featured.length - 1 : prevIndex - 1
      );
    }, 800);
  };

  const goToNext = () => {
    setFade(true); // Trigger fade animation
    setTimeout(() => {
      setFade(false); // Reset fade after animation completes
      setCurrentIndex((prevIndex) =>
        prevIndex === featured.length - 1 ? 0 : prevIndex + 1
      );
    }, 800); // Adjust this value to match your CSS transition duration
  };

  return (
    <div className={css.wrapper}>
      <i onClick={goToPrevious} className="fa-solid fa-arrow-left"></i>

      <div className={`${css.slideContainer} ${fade ? css.active : ""}`}>
        <img src={featured[currentIndex].path} alt="" />
        <a href={featured[currentIndex].product}>
          <button>Shop {featured[currentIndex].title}</button>
        </a>
      </div>
      <i onClick={goToNext} className="fa-solid fa-arrow-right"></i>
    </div>
  );
}
