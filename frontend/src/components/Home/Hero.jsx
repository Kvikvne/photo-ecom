import css from "./Styles/Hero.module.css";

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
            This space is a celebration of my love for photography and my skill
            in presenting captivating moments through the art of print. Explore
            and immerse yourself in a collection that reflects not only images
            captured through my lens but also the essence of unique stories
            preserved in each print.
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
