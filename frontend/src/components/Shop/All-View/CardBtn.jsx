import css from "./Styles/CardBtn.module.css";

export default function CardBtn({ productId }) {
  return (
    <a href={`/${productId}`}>
      <div className={css.btn}>
        <p>View details</p>
      </div>
    </a>
  );
}
