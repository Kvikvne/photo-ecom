import css from "./Styles/ShippingForm.module.css";
import { usePrintify } from "../../../utilities/printifyUtils";
import { useCartContent } from "../../../utilities/cartUtils";
import { useState, useEffect } from "react";
import SmallLoader from "../../Loaders/SmallLoader";

const REQ_URL = import.meta.env.VITE_UTIL

export default function ShippingForm() {
  const { shippingCost } = usePrintify();
  const { cartContent } = useCartContent();
  const [loading, setLoading] = useState(false);

  const [deliveryData, setDeliveryData] = useState({
    first_name: "",
    last_name: "",
    country: "US",
    address1: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Format line_items before sending
      const formattedData = {
        line_items: cartContent
          .map((cartItem) => {
            return cartItem.line_items.map((item) => ({
              product_id: item.product_id,
              variant_id: parseInt(item.variant_id, 10),
              quantity: parseInt(item.quantity, 10),
              print_provider_id: parseInt(item.metadata.print_provider_id, 10),
              blueprint_id: parseInt(item.metadata.blueprint_id, 10),
              sku: item.metadata.sku,
            }));
          })
          .flat(),
        address_to: {
          first_name: deliveryData.first_name,
          last_name: deliveryData.last_name,
          email: deliveryData.email,
          phone: deliveryData.phone,
          country: deliveryData.country,
          region: "",
          address1: deliveryData.address1,
          address2: "",
          city: deliveryData.city,
          zip: deliveryData.zip,
        },
      };


      // Get the shipping cost
      const shippingResponse = await shippingCost(formattedData);

      // Proceed to checkout
      await checkout(shippingResponse.standard, deliveryData);
    } catch (error) {
      console.error("Shipping Cost Error:", error);
    }
  };

  const checkout = async (shippingCost, deliveryData) => {
    try {
      const response = await fetch(`${REQ_URL}/checkout`, {
        withCredentials: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items: cartContent,
          shippingCost,
          deliveryData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.url) {
        window.location.assign(responseData.url);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
 

  return (
    <>
      <div className={css.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={css.header}>
            <h2>Shipping information</h2>
          </div>

          <div className={css.group}>
            <div className={css.inputBox}>
              <input
                value={deliveryData.firstName}
                onChange={handleInputChange}
                name="first_name"
                type="text"
                required
              />
              <span>First Name</span>
            </div>
            <div className={css.inputBox}>
              <input
                value={deliveryData.lastName}
                onChange={handleInputChange}
                name="last_name"
                type="text"
                required
              />
              <span>Last Name</span>
            </div>
          </div>

          <div className={css.inputBox}>
            <select
              name="country"
              value={deliveryData.country}
              onChange={handleInputChange}
            >
              <option value="US">United States</option>
            </select>
          </div>

          <div className={css.group}>
            <div className={css.inputBox}>
              <input
                value={deliveryData.address1}
                onChange={handleInputChange}
                name="address1"
                type="text"
                required
              />
              <span>Address</span>
            </div>
            <div className={css.inputBox}>
              <input
                value={deliveryData.city}
                onChange={handleInputChange}
                name="city"
                type="text"
                required
              />
              <span>City</span>
            </div>
            <div className={css.inputBox}>
              <input
                value={deliveryData.zip}
                onChange={handleInputChange}
                name="zip"
                type="text"
                required
              />
              <span>Zip code</span>
            </div>
          </div>

          <div className={css.inputBox}>
            <input
              value={deliveryData.email}
              onChange={handleInputChange}
              name="email"
              type="text"
              required
            />
            <span>Email</span>
          </div>
          <div className={css.inputBox}>
            <input
              value={deliveryData.phone}
              onChange={handleInputChange}
              name="phone"
              type="text"
              required
            />
            <span>Phone</span>
          </div>
          <button className={css.submitBtn} type="submit">
            {loading ? <SmallLoader /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
