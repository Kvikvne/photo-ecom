import css from "./Styles/ShippingForm.module.css";
import { useState } from "react";

export default function ShippingForm() {
  // delivery data array state
  const [deliveryData, setDeliveryData] = useState({
    first_name: "",
    last_name: "",
    country: "US",
    address1: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
    company: "",
  });

  // create array with user info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // submit array to express and mongodb
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", deliveryData);
  };

  return (
    <div className={css.formCard}>
      <form onSubmit={handleSubmit}>
        <div className={css.header}>
          <h2>Delivery</h2>
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
          <select name="country" value={deliveryData.country} onChange={handleInputChange}>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="AU">Australia</option>
            <option value="JP">Japan</option>
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
        <div className={css.inputBox}>
          <input
            value={deliveryData.company}
            onChange={handleInputChange}
            name="company"
            type="text"
            required
          />
          <span>Company</span>
        </div>
        {/* <button className={css.submitBtn} type="submit">
          Submit
        </button> */}
      </form>
    </div>
  );
}
