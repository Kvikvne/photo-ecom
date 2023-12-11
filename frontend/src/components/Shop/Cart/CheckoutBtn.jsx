import css from "./Styles/CheckoutBtn.module.css";

export default function CheckoutBtn({checkout}) {
  return (
    <a >
      <div onClick={checkout} className={css.btn}>
        <p>Checkout</p>
      </div>
    </a>
  );
}
