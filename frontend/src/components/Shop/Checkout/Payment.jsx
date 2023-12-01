import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import css from "./Styles/Payment.module.css";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MnjI0DJK1tIdvkfV93sr752hzgNPDDy5YpdIPccjypbfRv1ErFDP2uH8QKuJ1D0TJb1lSLOFHPCNroIUtCTe2Zf002AFJfLYG"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:3000/secret");
        const { client_secret } = await response.json();
        setClientSecret(client_secret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    rules: {
      ".Input": {
        backgroundColor: "transparent",
        border: "solid #06151c4d 1px",
        borderRadius: "4px",
        outline: "none",
        color: '#06151c',
        fontSize: "1em",
        fontWeight: "400",
        fontFamily: "'Outfit', sans-serif"
      },
      ".Input::placeholder": {
        color: '#06151c8d',
        fontSize: "1em",
        fontWeight: "400",
        fontFamily: "'Outfit', sans-serif",
        
      },
      ".Input:focus": {
        border: "solid #06151c 1px",
        boxShadow: 'none',
        outline: "none"
      },
      ".Label": {
        color: '#06151c',
        fontSize: "1em",
        fontWeight: "400",
        fontFamily: "'Outfit', sans-serif"
      },
    },
  };

  const options = {
    // passing the client secret obtained in step 3
    clientSecret,
    appearance,
  };

  if (loading) {
    // You can render a loading spinner or some other indication while fetching the client secret
    return <div>Loading...</div>;
  }

  if (!clientSecret) {
    // Handle the case where clientSecret is not available
    return <div>Error: Client secret not available</div>;
  }

  return (
    <div className={css.paymentContainer}>
      <div>
        <h2>Payment</h2>
      </div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
