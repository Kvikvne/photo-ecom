import ShippingForm from "../components/Shop/Checkout/ShippingForm";
import CartView from "../components/Shop/Checkout/CartView";
import css from "./Styles/CheckoutPage.module.css";
import { Helmet } from "react-helmet";

export default function CheckoutPage() {
  return (
    <div className={css.container}>
      <Helmet>
        <title>Checkout | KVIKVNE Photography</title>
      </Helmet>
      <div className={css.formCard}>
        <ShippingForm />
      </div>
      <CartView />
    </div>
  );
}
