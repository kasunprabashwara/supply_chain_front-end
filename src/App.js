// import "./App.css";
import React, { useState, useEffect } from "react";
import AdminPage from "./AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import OrderPage from "./OrderPage";

function App() {
  // const handleSubmit = () => {
  //   Axios.post("http://localhost:3001/api/insert", {
  //     cusName: name,
  //     review: review,
  //   }).then(() => {
  //     alert("success");
  //   });
  // };
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/api/get").then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
