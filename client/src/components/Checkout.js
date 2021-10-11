//npm i react-stripe-checkout:its a third party package for implementing the stripe checkout front end..in stripe publishable key is for react
//and secret key is for node js.in stripe integration.

import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch,useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Success from "../components/Success";
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Checkout({ subtotal }) {

  const orderstate=useSelector((state)=>state.placeOrderReducer)
  const {loading,error,success}=orderstate

  const dispatch = useDispatch();
  
  function tokenHandler(token) {
    console.log(token); //after generating token we have to dispatch action ie after pay now
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      {loading && (<Loading/>)}
      {error &&(<Error error="something went wrong"/>)}
      {success && (<Success success="Your Order Placed Successfully"/>)}

      <StripeCheckout 
        amount={subtotal * 100} //in this it will be converted into paisas in dollar convert into cents so adding any var to amount prop use *100
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51JhDjXSGgrvOfeWwyrIxK1SnD47A5yCIxykKQQgZvaH7hUtIbpy2dIDxpzDocOiwBIw4Y569g3YVvMfGsNsyzlzK00jKegSvGu"
        currency="INR"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
