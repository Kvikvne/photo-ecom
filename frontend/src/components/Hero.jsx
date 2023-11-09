import css from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={css.container}>
      <div className={css.overlay}></div>
      <div className={css.spacer}></div>
      <div className={css.title}>
        <p>Photography by</p>
        <h1>Kaikane Anderson</h1>
      </div>
      <div className={css.spacer}></div>
      <div className={css.bottomHero}>
        <div className={css.bottomLeft}>
          <p>
            Welcome to my photography portfolio, where the art of visual
            storytelling converges with the world of web development. This site
            is a testament to my passion for photography and my prowess in
            crafting digital experiences.
          </p>
        </div>
        <div className={css.circle}>
          <span className="material-symbols-outlined">arrow_downward</span>
        </div>
        <div className={css.bottomRight}>
          <p>
            Each photograph presented here is a result of my enduring journey
            through the years, nurtured amidst the enchanting landscapes of
            Kauai, my beloved island home.
          </p>
        </div>
      </div>
    </div>
  );
}
