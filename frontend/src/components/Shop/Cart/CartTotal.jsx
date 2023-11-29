import css from "./Styles/CartTotal.module.css";
import CheckoutBtn from "./CheckoutBtn";

export default function CartTotal({ totalPrice }) {
  return (
    <div className={css.card}>
      <a href="/prints">
        <div className={css.backToShop}>
          <p> Back to Shop</p>
        </div>
      </a>
      <div className={css.rightSide}>
        <p className={css.subTotal}>Subtotal: ${totalPrice}</p>
        <CheckoutBtn />
      </div>
    </div>
  );
}
