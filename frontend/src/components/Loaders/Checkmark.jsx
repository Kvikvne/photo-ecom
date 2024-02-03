import css from "./Styles/Checkmark.module.css";

export default function Checkmark() {
  return (
    <svg
      className={css.checkmark}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className={css.checkmark__circle}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className={css.checkmark__check}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
}
