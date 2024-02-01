import css from "./Styles/Hero.module.css";
import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 100,
    height: open ? 100 : 0,
    from: { opacity: 0, x: 100, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index}  style={style}>
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function Hero() {
  const [open, set] = useState(true);
  return (
    <div className={css.container}>
      <div className={css.overlay}></div>
      <div className={css.spacer}></div>
      <div className={css.title}>
        <Trail open={open}>
          <p>Photography by</p>
          <h1>Kaikane Anderson</h1>
          <div className={css.heroHook}>
            <p>
              This space is a celebration of my love for photography and my
              skill in presenting captivating moments through the art of print.
              Explore and immerse yourself in a collection that reflects not
              only images captured through my lens but also the essence of
              unique stories preserved in each print.
            </p>
          </div>
          <a href="/prints">
            <button>Shop prints</button>
          </a>
        </Trail>
      </div>
      <div className={css.spacer}></div>
      <div className={css.bottomHero}>
        <a href="#featured">
          <div className={css.circle}>
            <span className="material-symbols-outlined">arrow_downward</span>
          </div>
        </a>
      </div>
    </div>
  );
}
