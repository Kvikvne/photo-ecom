import css from "./Styles/NavMenu.module.css";

export default function NavMenu() {
  return (
    <div className={css.container}>
      <a href="/">
        <span>Home</span>
      </a>
      <a href="/about">
        <span>About</span>
      </a>
      <a href="/prints">
        <span>Canvas prints</span>
      </a>
      <a href="/my-orders">
        <span>My orders</span>
      </a>
    </div>
  );
}
