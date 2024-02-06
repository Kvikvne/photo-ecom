import css from "./Styles/CheckoutSuccess.module.css";
import { usePrintifyOrders } from "../utilities/orderUtils";
import SmallLoader from "../components/Loaders/SmallLoader";

export default function CheckoutSuccess() {
  const { mongoOrders, printifyOrders } = usePrintifyOrders();


  // Check if printifyOrders.data exists
  const printifyData = printifyOrders.data || [];

  // Get orderId from the last mongoOrder with the user session
  const orderId =
    mongoOrders[mongoOrders.length - 1]?.printifyResponse.id || "";

  // Filter printifyOrders only if it's an array and orderId exists
  const matching =
    Array.isArray(printifyData) && orderId
      ? printifyData.filter((order) => order.id === orderId)
      : [];

  // Destructure order details for readability
  const { metadata, line_items, total_price, total_shipping, address_to } =
    matching[0] || {};
  const { shop_order_id } = metadata || {};
  const { first_name } = address_to || {};
  const { title, variant_label } = line_items?.[0]?.metadata || {};
  const quantity = line_items?.[0]?.quantity || 0;
  const price = line_items?.[0]?.metadata.price

  // Calculate prices
  const itemPrice = price ? price / 100 : 0;
  const itemShipping = total_shipping ? total_shipping / 100 : 0;
  const totalPrice = itemPrice * quantity + itemShipping;

  if (typeof address_to !== "undefined" && totalPrice > 0) {
    return (
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.mainText}>
            <p>Thank you {first_name}</p>
            <h1>Your order has been received</h1>
            <p>
              You will receive an email as soon as your order is shipped out.
            </p>
            <div>
              <p>Order #: {shop_order_id}</p>
            </div>
          </div>
          <div className={css.orderDetails}>
            
            <div className={css.costSummary}>
            <h2>Order summary</h2>
              <p>
                <span>
                  {title} {variant_label} x {quantity} :
                </span>
                ${itemPrice}
              </p>
              <p>
                <span>Shipping:</span> ${itemShipping}
              </p>
              <p>
                <span>Total: </span>${totalPrice}
              </p>
            </div>

            <div className={css.shippingSummary}>
              <h2>Shipping</h2>
              {Object.keys(address_to).map((key, index) => (
                <p key={index}>{address_to[key]}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={css.container}>
        <SmallLoader />
      </div>
    );
  }
}

// users can now see all of their orders using this method
// if session lost, printify should email them with the shipping data by then
