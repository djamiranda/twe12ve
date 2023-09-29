import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <img src='12.jpg' alt="pic" />
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
