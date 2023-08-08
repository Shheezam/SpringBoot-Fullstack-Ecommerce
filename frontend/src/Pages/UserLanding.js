import React from "react";
import Navbar from "../Components/Navbar";
import Dashboard from "./UserSections/Dashboard";
import Products from "./UserSections/Products";
import { Route, Routes } from "react-router-dom";
import ViewProduct from "./UserSections/ViewProduct";
import Sidebar from "../Components/Sidebar";
import Card from "./UserSections/Card";
import Checkout from "./UserSections/Checkout";
import PaymentHistory from "./UserSections/PaymentHistory";

const UserLanding = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/card" element={<Card />}></Route>
        <Route path="/history" element={<PaymentHistory />}></Route>
        <Route path="/viewProduct/:id" element={<ViewProduct />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Sidebar />
    </>
  );
};

export default UserLanding;
