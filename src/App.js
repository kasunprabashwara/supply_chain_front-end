import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const handleSubmit = () => {
    Axios.post("http://localhost:3001/api/insert", {
      cusName: name,
      review: review,
    }).then(() => {
      alert("success");
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Test</h1>
      <div className="form">
        <label>Name</label>
        <input
          type="text"
          name="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Review</label>
        <input
          type="text"
          name="Review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
