import css from "./Styles/CardBtn.module.css";

export default function CardBtn({ productId, tag }) {
  return (
    <a href={`/products/${tag}/${productId}`}>
      <div className={css.btn}>
        <p>View details</p>
      </div>
    </a>
  );
}
