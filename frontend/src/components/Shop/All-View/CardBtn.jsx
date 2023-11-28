import css from "./Styles/CardBtn.module.css";

export default function CardBtn({ productId }) {
  return (
    <a href={`prints/${productId}`}>
      <div className={css.btn}>
        <p>View details</p>
      </div>
    </a>
  );
}
