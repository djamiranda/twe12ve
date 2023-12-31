// import react dependencies
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useQuery } from '@apollo/client';

// import utils dependencies
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

// import component
import Cart from '../components/Cart';

// import assset
import spinner from '../assets/spinner.gif';
import Jumbotron from '../components/Jumbotron';
import PopupWindow from '../components/PopupWindow';

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { products, cart } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // if data, loading, or dispatch is updated, update products
  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  // update cart quantity if itemInCart exists; otherwise add to cart 
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  // remove item with currentProduct._id from cart
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">⏪ HOME</Link>
          <Jumbotron>
          <h2>{currentProduct.name}</h2>
          <p>{currentProduct.description}</p>
          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>🔥 GET 'EM</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              🧱TRASH
            </button>
          </p>
          <div className="header-getem">
            <h1 className="title-getem">GET</h1>
            <h1 className="title-getem second"><i>'</i>EM</h1>
          </div>
          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
            width="300" 
          />
          </Jumbotron>
          <PopupWindow currentProduct={currentProduct} />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;