import css from "./Styles/ProductCard.module.css";
import CardBtn from "./CardBtn";

export default function ProductCard({
  variant,
  cardPhoto,
  cardDescription,
  price,
  title,
  productId,
}) {
  return (
    <div className={css.container}>
      <div className={css.productCard}>
        <a href={`prints/${productId}`}>
          <div className={css.productImg}>
            <img src={cardPhoto} alt="" />
          </div>
        </a>
        <div className={css.productP}>
          <h4>{title}</h4>
        </div>

        <div className={css.bottom}>
          <div className={css.price}>
            <p>From ${price.toFixed(2)}</p>
          </div>
          <div className={css.size}>
            <h4>Size Range</h4>
            <p>{variant}</p>
          </div>
        </div>
        <CardBtn productId={productId} />
      </div>
    </div>
  );
}
