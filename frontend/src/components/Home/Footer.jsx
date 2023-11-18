import css from "./Styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={css.container}>
      <div className={css.title}>
        <span class="material-symbols-outlined">handshake</span>
        <p>
          If you are interested in my work please feel free to reach out via the
          links below
        </p>
        <div className={css.btn}>Let's connect</div>
      </div>
      <div className={css.middle}>
        <div className={css.card}>
          <h1>Talk</h1>
          <p>1(234)567-8910</p>
        </div>
        <div className={css.card}>
          <h1>Write</h1>
          <p>kaianderson9@gmail.com</p>
        </div>
        <div className={css.card}>
          <h1>Tech Portfolio</h1>
          <p><a href="kvikvne.github.io/portfolio/">Click Me!</a></p>
        </div>
      </div>
      <div className={css.bottom}>
        <div className={css.circleIcon}>
          <i class="fa-brands fa-instagram"></i>
        </div>
        <div className={css.spacer}></div>
        <div className={css.circleIcon}>
          <i class="fa-brands fa-github"></i>
        </div>
      </div>
      <div className={css.copyright}>
        <p>&copy; 2023 Photography By Kai. All rights reserved.</p>
      </div>
    </div>
  );
}
