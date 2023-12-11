import ShippingForm from "../components/Shop/Checkout/ShippingForm";
import CartView from "../components/Shop/Checkout/CartView";
import css from "./Styles/CheckoutPage.module.css";

export default function CheckoutPage() {
  return (
    <div className={css.container}>
      <div className={css.formCard}>
        <ShippingForm />
       
      </div>
      <CartView />
    </div>
  );
}
