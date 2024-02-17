import css from "./Styles/MyOrders.module.css";
import { usePrintifyOrders } from "../utilities/orderUtils";
import { useState, useEffect } from "react";
import SmallLoader from "../components/Loaders/SmallLoader";

export default function MyOrders() {
  const { mongoOrders, printifyOrders, cancelOrder } = usePrintifyOrders();
  const [foundIds, setFoundIds] = useState([]);
  const [filteredPrintifyData, setFilteredPrintifyData] = useState([]);
  const [cancelConfirmationId, setCancelConfirmationId] = useState(null);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [noOrders, setNoOrders] = useState(false);

  // find printify response id in database to match with printify api order id
  useEffect(() => {
    if (mongoOrders && mongoOrders.length > 0) {
      const ids = mongoOrders.map((item) => item.printifyResponse.id);
      setFoundIds(ids);
      setNoOrders(false);
    } else {
      setNoOrders(true);
    }
  }, [mongoOrders]);

  // filter orders by id
  useEffect(() => {
    if (printifyOrders && printifyOrders.data) {
      const filteredData = printifyOrders.data.filter((item) =>
        foundIds.includes(item.id)
      );
      setFilteredPrintifyData(filteredData);
    }
  }, [foundIds, printifyOrders]);

  const handleCancelConfirmation = (orderId) => {
    setCancelConfirmationId(orderId);
  };

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId.toString());
    setCancelConfirmationId(null);
    // window.location.reload();
  };

  if (noOrders) {
    return (
      <div className={css.container}>
        <p>No orders found</p>
      </div>
    );
  }

  if (filteredPrintifyData.length > 0) {
    return (
      <div className={css.container}>
        <div className={css.tableContainer}>
          <table className={css.mainTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>ID</th>
                <th>Product</th>
                <th>Shipping</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* calculate cost of each order and return elements for each order */}
              {filteredPrintifyData.map((order, index) => {
                let totalItem = 0;
                order.line_items.forEach((item) => {
                  totalItem += item.metadata.price / 100;
                });

                return (
                  <tr key={index}>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td
                      style={{
                        color:
                          order.line_items[0].status === "canceled"
                            ? "#da1e28"
                            : order.line_items[0].status === "shipped"
                            ? "#198038"
                            : order.line_items[0].status === "Delivered"
                            ? "#6929c4"
                            : order.line_items[0].status === "on-hold"
                            ? "#33b1ff"
                            : "inherit",
                      }}
                    >
                      {order.line_items[0].status}
                    </td>
                    <td>{order.metadata.shop_order_id}</td>
                    <td>
                      {order.line_items.map((item, index) => (
                        <table key={index} className={css.nestedTable}>
                          <tbody>
                            <tr>
                              <td>
                                {item.metadata.title}
                                {item.metadata.variant_label} x {item.quantity}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    </td>

                    <td className={css.costCol}>
                      {order.line_items[0].status === "canceled"
                        ? "-"
                        : `$${order.total_shipping / 100}`}
                    </td>

                    <td className={css.costCol}>
                      {order.line_items[0].status === "canceled"
                        ? "-"
                        : `$${totalItem}`}
                    </td>
                    <td className={css.costCol}>
                      {order.line_items[0].status === "canceled"
                        ? "-"
                        : `$${(totalItem + order.total_shipping / 100).toFixed(
                            2
                          )}`}
                    </td>

                    {order.line_items[0].status === "canceled" ? (
                      ""
                    ) : (
                      <td>
                        <a target="_blank" href={order.printify_connect.url}>
                          <button>Tracking</button>
                        </a>
                      </td>
                    )}
                    {order.line_items[0].status === "canceled" ||
                    order.line_items[0].status === "shipped" ? (
                      ""
                    ) : (
                      <td>
                        {cancelConfirmationId === order.id ? (
                          <>
                            <div className={css.cancelOrderContainer}>
                              <div className={css.cancelOrder}>
                                Are you sure you want to cancel this order?
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setCancelConfirmationId(null)}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCancelConfirmation(order.id)}
                            >
                              Cancel Order
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleCancelConfirmation(order.id)}
                          >
                            Cancel Order
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={css.support}>
          <p>
            If you need help with an order click
            <a href="mailto: kaianderson9@gmail.com"> here</a> or copy the email
            found at the bottom of the web page. <br />
            <br /> Please include your orders ID aswell as your shipping info in
            the email.
          </p>
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
