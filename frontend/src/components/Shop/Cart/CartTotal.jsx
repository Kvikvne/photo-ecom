import css from "./Styles/CartTotal.module.css";
import CheckoutBtn from "./CheckoutBtn";

export default function CartTotal({ totalPrice, checkout, totalQuantity }) {
  return (
    <div className={css.card}>
      <a href="/prints">
        <div className={css.backToShop}>
          <p> Back to Shop</p>
        </div>
      </a>
      <div className={css.rightSide}>
        <p className={css.subTotal}>
          {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
        </p>

        <p className={css.subTotal}>Subtotal: ${totalPrice}</p>
        <CheckoutBtn checkout={checkout} />
      </div>
    </div>
  );
}
