import React, { useState, useEffect } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripePromise = loadStripe("pk_test_51OrwZd2MYeojk7WwLlwx5viX9jLq4i7qGJKPQHXwbQEzfbTJXBVeIdhUocIOSCd4cJqBGiohL8sgHb30QhK14jdx00m1E3fQtw");

const CheckoutForm = ({ PRICEINFO }) => {
  const [clientSecret, setClientSecret] = useState('');

  var PRICE = "";

  useEffect(() => {
    switch (PRICEINFO) {
      case "build":
        PRICE = "price_1OsAPw2MYeojk7WwyrCKqKUk";
        break;
      case "grow":
        PRICE = "price_1OsAQQ2MYeojk7Ww3HLNOlwT";

        break;
      case "exit":
        PRICE = "price_1OsAQq2MYeojk7WwGR7v6lyr";

        break;
    }

    const url = `/create-checkout-session`
    const data = {
      price: PRICE,
      target: PRICEINFO,
    }
    axios.post(url,data)
    .then((resp)=>{
      // console.log(data);
      setClientSecret(resp.data.clientSecret)
    })
    .catch((err)=>console.error(err))
    // fetch(`${process.env.REACT_APP_URL}/create-checkout-session`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     price: PRICE,
    //     target: PRICEINFO,

    //   })
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // setClientSecret(data.clientSecret)
    //     console.log(data);
    //   });
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}
export default CheckoutForm;