import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Report from "./Report1";
import AdminPage from "./AdminPage";

function App() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
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
    <div className="App">
      <AdminPage />
    </div>
  );
}

export default App;
