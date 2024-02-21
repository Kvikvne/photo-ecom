import React, { useState, useEffect } from "react";
import css from "./Styles/CheckoutSuccess.module.css";
import { usePrintifyOrders } from "../utilities/confirmUtils";
import SmallLoader from "../components/Loaders/SmallLoader";

export default function CheckoutSuccess() {
  const { printifyOrders, mongoOrders } = usePrintifyOrders();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (printifyOrders.data && printifyOrders.data.length > 0) {
        setLoading(false);
      }
    
  }, [printifyOrders.data]);

  if (loading) {
    return (
      <div className={css.container}>
        <SmallLoader />
      </div>
    );
  }
  // Find matching order from printify
  const orderId = mongoOrders[mongoOrders.length - 1].printifyResponse.id;

  const matchingOrder = printifyOrders.data.find(
    (order) => order.id === orderId
  );

  if (!matchingOrder) {
    return <p>Error: Order not found.</p>;
  }

  // Get order data
  const { metadata, line_items, total_shipping, address_to } = matchingOrder;
  const { shop_order_id } = metadata;
  const { first_name } = address_to;
  const itemShipping = total_shipping ? total_shipping / 100 : 0;

  // calculate total price for each item in the order plus shipping cost
  let total = 0;
  line_items.forEach((item) => {
    const price = item.metadata.price;
    if (typeof price === "number") {
      total += price;
    }
  });

  const formattedTotal = ((total + total_shipping) / 100).toFixed(2);

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
        </div>
        <div className={css.orderDetails}>
          <div className={css.costSummary}>
            <h2>Order summary</h2>
            {line_items.map((item, index) => (
              <p key={index}>
                <span>
                  {item.metadata.title} {item.metadata.variant_label}{" "}
                </span>
                ${(item.metadata.price / 100).toFixed(2)} x {item.quantity}
              </p>
            ))}
            <p>
              <span>Shipping:</span> ${itemShipping}
            </p>

            <p>
              <span>Total: </span>${formattedTotal}
            </p>
          </div>

          <div className={css.shippingSummary}>
            <h2>Shipping</h2>
            {Object.keys(address_to).map((key, index) => (
              <p key={index}>{address_to[key]}</p>
            ))}
          </div>
        </div>
        <a href="/my-orders">
          <button>View orders</button>
        </a>
      </div>
    </div>
  );
}
