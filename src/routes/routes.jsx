import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "../pages/home";
import Menu from "../pages/menu";
import Cart from "../pages/cart";
import Manager from "../pages/managerHome";
import Create from "../pages/manager";
import Login from "../pages/login";


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
        <Route element={<Create></Create>} path="/cardapio" />
        <Route element={<Manager></Manager>} path="/manager"/>
        <Route element={<Login></Login>} path="/login"/>
      </Routes>
      </div>
      <div className="FooterRoute">
      </div>
    </BrowserRouter>
  );
};

export default RoutesPath;