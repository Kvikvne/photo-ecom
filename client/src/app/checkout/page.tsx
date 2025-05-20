import CheckoutForm from "@/components/shop/checkout/checkout-form";
import CartSummary from "@/components/shop/checkout/cart-summary";

export default async function Checkout() {
    return (
        <>
            <CheckoutForm />
            <CartSummary />
        </>
    );
}
