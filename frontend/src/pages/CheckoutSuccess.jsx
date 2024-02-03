import css from "./Styles/CheckoutSuccess.module.css";
import { usePrintifyOrders } from "../utilities/orderUtils";

export default function CheckoutSuccess() {
  const { mongoOrders, printifyOrders } = usePrintifyOrders();
  console.log("printifyOrders: ", printifyOrders.data);
  

  // Check if printifyOrders.data exists
  const printifyData = printifyOrders.data || [];

  // Get orderId from the last mongoOrder with the user session
  const orderId = mongoOrders[mongoOrders.length - 1]?.printifyResponse.id || "";

  // Filter printifyOrders only if it's an array and orderId exists
  const matching = Array.isArray(printifyData) && orderId
    ? printifyData.filter((order) => order.id === orderId)
    : [];

  // Destructure order details for readability
  const { metadata, line_items, total_price, total_shipping } = matching[0] || {};
  const { shop_order_id } = metadata || {};
  const { first_name } = metadata?.address_to || {};
  const { title, variant_label } = line_items?.[0]?.metadata || {};
  const quantity = line_items?.[0]?.quantity || 0;

  // Calculate prices
  const itemPrice = total_price ? total_price / 100 : 0;
  const itemShipping = total_shipping ? total_shipping / 100 : 0;
  const totalPrice = itemPrice + itemShipping;

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.mainText}>
          <p>Thank you {first_name}</p>
          <h1>Your order has been received</h1>
          <p>You will receive an email as soon as your order is shipped out.</p>
          <div>
            <p>Order #: {shop_order_id}</p>
          </div>
          <div>
            <h3>{title}</h3>
            <p>{variant_label}</p>
            <p>Quantity: {quantity}</p>
          </div>
          <div>
            <p>${itemPrice}</p>
            <p>Shipping: ${itemShipping}</p>
            <p>Total: ${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


// users can now see all of their orders using this method
// if session lost, printify should email them with the shipping data by then
