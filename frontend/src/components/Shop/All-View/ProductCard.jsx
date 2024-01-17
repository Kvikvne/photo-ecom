import css from "./Styles/ProductCard.module.css";
import CardBtn from "./CardBtn";

export default function ProductCard({ cardPhoto, cardDescription, price, title, productId }) {
  return (
    <div className={css.container}>
      <div className={css.productCard}>
        <div className={css.productImg}>
          <img src={cardPhoto} alt="" />
        </div>
        <div className={css.productP}>
            <h4>{title}</h4>
          
        </div>
        <div className={css.bottom}>
          <div className={css.price}>
            <p>From ${price.toFixed(2)}</p>
          </div>

          <CardBtn 
          productId={productId}
          />
        </div>
      </div>
    </div>
  );
}
