import css from "./Styles/CheckoutBtn.module.css";

export default function CheckoutBtn() {
  return (
    <a href="/checkout">
      <div className={css.btn}>
        <p>Checkout</p>
      </div>
    </a>
  );
}
