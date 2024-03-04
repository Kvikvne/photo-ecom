import css from "./Styles/CartTotal.module.css";
import CheckoutBtn from "./CheckoutBtn";
import { useCartContent } from "../../../utilities/cartUtils";

export default function CartTotal({ totalPrice, checkout, totalQuantity }) {
  const { cartContent } = useCartContent();
  const isCartEmpty = cartContent.length === 0;
  return (
    <div className={css.card}>
      <a href="/products">
        <div className={css.backToShop}>
          <p> Back to Shop</p>
        </div>
      </a>
      <div className={css.rightSide}>
        <p className={css.subTotal}>
          {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
        </p>

        <p className={css.subTotal}>Subtotal: ${totalPrice}</p>

        {!isCartEmpty && <CheckoutBtn checkout={checkout} />}
      </div>
    </div>
  );
}
