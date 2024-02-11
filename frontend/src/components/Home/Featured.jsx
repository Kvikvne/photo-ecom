import React from "react";
import css from "./Styles/Featured.module.css";
import Arrow from "./Arrow";
import Masonry from "./Masonry";

export default function Featured() {
  return (
    <div id="featured" className={css.container}>
      <div className={css.wrapper}>
        <div className={css.title}>
          <p>One of my favorites.</p>
          <h1>Inspire through Imagery</h1>
        </div>
        <div className={css.image}>
          <img src="./IMG_9088.jpg" alt="" />
        </div>
        <div className={css.description}>
          <p>
            Photography is the art of capturing moments, emotions, and the
            beauty of our world through the lens of a camera. My photography
            collection is a visual journey that showcases the wonders of life,
            from the grand landscapes to the smallest details. With each click
            of the shutter, we aim to freeze time and immortalize the essence of
            every scene.
          </p>
          <a href="#collection">
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}
