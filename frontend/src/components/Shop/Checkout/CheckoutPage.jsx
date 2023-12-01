import ShippingForm from "./ShippingForm";
import Payment from "./Payment";
import CartView from "./CartView";
import css from "./Styles/CheckoutPage.module.css";

export default function CheckoutPage() {
  return (
    <div className={css.container}>
      <div className={css.formCard}>
        <ShippingForm />
        <Payment />
      </div>
      <CartView />
    </div>
  );
}
