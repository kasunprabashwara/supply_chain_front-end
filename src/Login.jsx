import { useState } from "react";
import "./styles.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Navigate} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName,setUserName]= useState();
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.data.msg === "User logged in") {
        setLoggedIn(true);
      } else {
        alert(response.data.msg);
      }
    });
  };

  const handleRegister = (values) => {
    setUserName(values.email);
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const validationsRegister = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("password is required"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  return (
    <div className="container">
      {loggedIn && <Navigate to="/admin" state={{ name:  }} />}
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field
              name="email"
              className="form-field"
              placeholder="Email"
              style={{
                transition: "all 0.2s ease-in-out",
                borderRadius: "7px",
                font: "13px Helvetica, Arial, sans-serif",
                border: "3px solid #ccc",
                background: "#ffffff",
                margin: "3px",
                color: "rgb(0, 0, 0)",
                padding: "7px 3px",
                width: "250px",
              }}
            />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
              style={{ color: "red", margin: "7px 3px" }}
            />
          </div>
          <div className="form-group">
            <Field
              name="password"
              className="form-field"
              type="password"
              placeholder="Password"
              style={{
                transition: "all 0.2s ease-in-out",
                borderRadius: "7px",
                font: "13px Helvetica, Arial, sans-serif",
                border: "3px solid #ccc",
                background: "#fff",
                margin: "3px",
                color: "rgb(0, 0, 0)",
                padding: "7px 3px",
                width: "250px",
              }}
            />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
              style={{ color: "red", margin: "7px 3px" }}
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <h1>Registration</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="register-form-group">
            <Field
              name="email"
              className="form-field"
              placeholder="Email"
              style={{
                transition: "all 0.2s ease-in-out",
                borderRadius: "7px",
                font: "13px Helvetica, Arial, sans-serif",
                border: "3px solid #ccc",
                background: "#fff",
                margin: "3px",
                color: "rgb(0, 0, 0)",
                padding: "7px 3px",
                width: "250px",
              }}
            />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
              style={{ color: "red", margin: "7px 3px" }}
            />
          </div>

          <div className="form-group">
            <Field
              name="password"
              className="form-field"
              type="password"
              placeholder="Password"
              style={{
                transition: "all 0.2s ease-in-out",
                borderRadius: "7px",
                font: "13px Helvetica, Arial, sans-serif",
                border: "3px solid #ccc",
                background: "#fff",
                margin: "3px",
                color: "rgb(0, 0, 0)",
                padding: "7px 3px",
                width: "250px",
              }}
            />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
              style={{ color: "red", margin: "7px 3px" }}
            />
          </div>

          <div className="form-group">
            <Field
              name="confirmation"
              className="form-field"
              type="password"
              placeholder="Password"
              style={{
                transition: "all 0.2s ease-in-out",
                borderRadius: "7px",
                font: "13px Helvetica, Arial, sans-serif",
                border: "3px solid #ccc",
                background: "#fff",
                margin: "3px",
                color: "rgb(0, 0, 0)",
                padding: "7px 3px",
                width: "250px",
              }}
            />

            <ErrorMessage
              component="span"
              name="confirmation"
              className="form-error"
              style={{ color: "red", margin: "7px 3px" }}
            />
          </div>

          <button className="button" type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
