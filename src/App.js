import "./App.css";
import React, { useState, useEffect } from "react";
import AdminPage from "./AdminPage";
import { BrowserRouter, Routes, Route, ProtectedRoute } from "react-router-dom";
import Login from "./Login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
