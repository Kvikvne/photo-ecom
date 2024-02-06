import css from "./Styles/MyOrders.module.css";
import { usePrintifyOrders } from "../utilities/orderUtils";
import { useState, useEffect } from "react";
import SmallLoader from "../components/Loaders/SmallLoader";

export default function MyOrders() {
  const { mongoOrders, printifyOrders } = usePrintifyOrders();
  const [foundIds, setFoundIds] = useState([]);
  const [filteredPrintifyData, setFilteredPrintifyData] = useState([]);

  // Check if printifyOrders.data exists
  const printifyData = printifyOrders.data || [];

  useEffect(() => {
    if (mongoOrders && mongoOrders.length > 0) {
      const ids = mongoOrders.map((item) => item.printifyResponse.id);
      setFoundIds(ids); // <-- setState here
    }
  }, [mongoOrders]);

  useEffect(() => {
    // Filter printifyData based on foundIds
    const filteredData = printifyData.filter((item) =>
      foundIds.includes(item.id)
    );
    // Update filteredPrintifyData state with the filtered data
    setFilteredPrintifyData(filteredData);
  }, [foundIds, printifyData]);

  if (filteredPrintifyData.length > 0) {
    return (
      <div className={css.container}>
        {/* <h1> ** Add a way to cancel an order and contact support **</h1> */}
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Shipping</th>
              <th>Items</th>
              <th>Total</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrintifyData.map((order, index) => (
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

                <td>
                  {order.line_items[0].metadata.title}{" "}
                  {order.line_items[0].metadata.variant_label}
                </td>
                <td>{order.line_items[0].quantity}</td>
                <td>
                  {order.line_items[0].status === "canceled"
                    ? "-"
                    : `$${order.line_items[0].shipping_cost / 100}`}
                </td>
                <td>
                  {order.line_items[0].status === "canceled"
                    ? "-"
                    : `$${order.line_items[0].metadata.price / 100}`}
                </td>
                <td>
                  {order.line_items[0].status === "canceled"
                    ? "-"
                    : `$${(
                        (order.line_items[0].metadata.price / 100) *
                          order.line_items[0].quantity +
                        order.line_items[0].shipping_cost / 100
                      ).toFixed(2)}`}
                </td>

                <td>
                  {order.line_items[0].status === "canceled" ? (
                    "-"
                  ) : (
                    <a target="_blank" href={order.printify_connect.url}>
                      <button>Tracking</button>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
