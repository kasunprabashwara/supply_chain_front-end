import { useState } from "react";
import "./styles.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Navigate, Link } from "react-router-dom";
import Layout from "./layout";

function App() {
  const [isAdmin, setisAdmin] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [currentUsername, setUsername] = useState();
  const [customerID, setcustomerID] = useState();

  const handleLogin = (values) => {
    setUsername(values.username);
    console.log(process.env.REACT_APP_DOMAIN_NAME);
    Axios.post(process.env.REACT_APP_DOMAIN_NAME+"/checkadmin", {
      username: values.username,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.data.msg === "Admin logged in") {
        setisAdmin(true);
        console.log("Logged in as admin");
      }
    });

    if (!isAdmin) {
      Axios.post(process.env.REACT_APP_DOMAIN_NAME+"/checkuser", {
        username: values.username,
        password: values.password,
      }).then((response) => {
        console.log(response);
        if (response.data.msg === "User logged in") {
          setcustomerID(response.data.customerID);
          setisUser(true);
          console.log("Logged in as user");
        } else {
          alert(response.data.msg);
        }
      });
    }
  };

  const validationsLogin = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <Layout>
    <div className="container">
      {isAdmin && (
        <Navigate to="/admin" state={{ username: currentUsername }} />
      )}
      {isUser && (
        <Navigate
          to="/order"
          state={{ username: currentUsername, customerID: customerID }}
        />
      )}
      <h1>Welcome to EasyExpress web portal</h1>
      <h2>Login</h2>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter your username"
            />
            <ErrorMessage
              component="div"
              name="username"
              className="form-error text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              id="password"
              className="form-control"
              type="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              component="div"
              name="password"
              className="form-error text-danger"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <p>
        Don't have an account?{" "}
        <Link to="/signin">Register as a new customer</Link>
      </p>
    </div>
    </Layout>
  );
}

export default App;
