import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "../pages/home";
import Menu from "../pages/menu";
import Cart from "../pages/cart";


const RoutesPath = () => {
  return (
    <BrowserRouter>
    <div className="Header">
    </div>
    <div className="AllPages">
      <Routes>
        <Route element={<Home></Home>} path="/" exact />
        <Route element={<Menu></Menu>} path="/menu" />
        <Route element={<Cart></Cart>} path="/carrinho" />
      </Routes>
      </div>
      <div className="FooterRoute">
      </div>
    </BrowserRouter>
  );
};

export default RoutesPath;