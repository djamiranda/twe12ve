import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { Link } from "react-router-dom";
import "./style.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function calculateCartCount() {
    let count = 0;
    state.cart.forEach((item) => {
      count += item.purchaseQuantity;
    });
    return count;
  };

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        {calculateCartCount() > 0 && ( // Check if there are items in the cart
          <span className="cart-count">{calculateCartCount()}</span>
        )}{" "} 
        <span role="img" aria-label="trash">
        <img width="48" height="48" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Basketball-Hoop-basketball-nawicon-outline-color-nawicon.png" alt="external-Basketball-Hoop-basketball-nawicon-outline-color-nawicon"/>
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
      ❎
      </div>
      <h2>Total Items: <span className="cart-count">{calculateCartCount()}</span></h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Cash Out</button>
            ) : (
              
              <Link to="/login">JOIN NOW / SIGN IN</Link>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
          🤖 Shoot Your Shot! 🤖</span>
        </h3>
      )}
    </div>
  );
};

export default Cart;
