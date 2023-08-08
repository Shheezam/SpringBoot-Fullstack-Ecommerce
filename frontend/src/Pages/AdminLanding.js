import React from "react";
import Header from "../Components/Header";
import AddProduct from "./AdminSections/AddProduct";
import Reports from "./AdminSections/Reports";
import { Route, Routes } from "react-router-dom";
import Home from "./AdminSections/Home";
import EditProduct from "./AdminSections/EditProduct";

const AdminLanding = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/editProduct/:id" element={<EditProduct />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </>
  );
};

export default AdminLanding;
