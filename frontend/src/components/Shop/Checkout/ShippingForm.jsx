import css from "./Styles/ShippingForm.module.css";
import { usePrintify } from "../../../utilities/printifyUtils";
import { useCartContent } from "../../../utilities/cartUtils";
import { useState, useEffect } from "react";

export default function ShippingForm() {
  const { printifyProducts, shippingCost } = usePrintify();
  const { cartContent } = useCartContent();

  const [formattedLineItems, setFormattedLineItems] = useState([]);
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

  useEffect(() => {
    // Check if cartContent is available and has line_items
    if (cartContent && cartContent[0]?.line_items) {
      // Transform line_items into the desired format
      const transformedLineItems = cartContent[0].line_items
        .map((item) => {
          const { product_id, variant_id, quantity } = item;
          const { print_provider_id, blueprint_id, sku } = item.metadata;

          return [
            { product_id, variant_id, quantity },
            { print_provider_id, blueprint_id, variant_id, quantity },
            { sku, quantity },
          ];
        })
        .flat(); // Flatten the array of arrays

      // Update the state with the transformed line_items
      setFormattedLineItems(transformedLineItems);
    }
  }, [cartContent]);

  // create array with user info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // submit array to express and mongodb
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format line_items before sending
    const formattedData = {
      line_items: formattedLineItems,
      address_to: {
        first_name: deliveryData.first_name,
        last_name: deliveryData.last_name,
        email: deliveryData.email,
        phone: deliveryData.phone,
        country: deliveryData.country,
        region: "", // Set your region logic if needed
        address1: deliveryData.address1,
        address2: "", // Set your address2 logic if needed
        city: deliveryData.city,
        zip: deliveryData.zip,
      },

    
    };
      
    try {
      // Get the shipping cost
      console.log(deliveryData)
      const shippingResponse = await shippingCost(formattedData);
      console.log("Shipping Cost:", shippingResponse.standard);

      // Now you can proceed to checkout
      await checkout(shippingResponse.standard, deliveryData);
    } catch (error) {
      // Handle errors here
      console.error("Shipping Cost Error:", error);
    }
    
  };
  
  

  const checkout = async (shippingCost, deliveryData) => {
    try {
      const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ items: cartContent, shippingCost, deliveryData }),
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
      // Handle the error as needed
    }
  };
  return (
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
        <button onClick={checkout} className={css.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
