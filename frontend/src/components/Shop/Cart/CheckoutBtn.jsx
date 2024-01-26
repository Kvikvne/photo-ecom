import css from "./Styles/CheckoutBtn.module.css";

export default function CheckoutBtn({ checkout }) {
  return (
    <a href="/checkout-shipping">
      <div className={css.btn}>
        <p>Checkout</p>
      </div>
    </a>
  );
}
