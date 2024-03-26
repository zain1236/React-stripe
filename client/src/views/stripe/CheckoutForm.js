import React, { useState, useEffect } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

 const stripePromise = loadStripe("pk_live_51OmaaTFnjeAcTNL67XmKhEyw45gSOpTkYqm6ZsAqERZaCLXC2Oq68XBVhSSsVqBFvPCz2y5GXOrB1fQXf6AuIoGj00TgBJJ8Ue");

const CheckoutForm = ({ PRICEINFO }) => {
  const [clientSecret, setClientSecret] = useState('');

  var PRICE = "";
 

  useEffect(() => {
    switch (PRICEINFO) {
      case "build":
        PRICE = "price_1OygbRFnjeAcTNL6WRYhDkLJ";
        break;
      case "grow":
        PRICE = "price_1Oygd9FnjeAcTNL6KmNtXY5k";

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