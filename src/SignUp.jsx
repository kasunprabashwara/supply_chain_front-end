import { useState } from "react";
import "./styles.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import Layout from "./layout";

function SignIn() {
  const [registered, setRegistered] = useState(false);

  const handleRegister = (values) => {
    Axios.post(process.env.REACT_APP_DOMAIN_NAME+"/register", {
      username: values.username,
      address: values.address,
      usertype: values.usertype,
      number: values.number,
      password: values.password,
    }).then((response) => {
      if (response.data.msg === "Customer successfully added") {
        setRegistered(true);
      }
      alert(response.data.msg);
    });
  };

  const validationsRegister = yup.object().shape({
    username: yup.string().required("Username is required"),
    address: yup.string().required("Address is required"),
    usertype: yup.string().required("User Type is required"),
    number: yup
      .string()
      .length(10, "Phone number must be 10 digits")
      .required("Contact number is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  return (
    <Layout>
    <div className="container">
      {registered && <Navigate to="/" />}
      <h1>Registration. Enter your details</h1>
      <Formik
        initialValues={{ usertype: "end customer" }}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              id="username"
              className="form-control"
              placeholder="Username"
            />
            <ErrorMessage
              component="span"
              name="username"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <Field
              name="address"
              id="address"
              className="form-control"
              placeholder="Address"
            />
            <ErrorMessage
              component="span"
              name="address"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Telephone Number</label>
            <Field
              name="number"
              id="number"
              className="form-control"
              placeholder="Telephone Number"
            />
            <ErrorMessage
              component="span"
              name="number"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usertype">User Type</label>
            <Field
              as="select"
              name="usertype"
              id="usertype"
              className="form-control"
            >
              <option value="wholesaler">Wholesaler</option>
              <option value="retailer">Retailer</option>
              <option value="end customer">End Customer</option>
            </Field>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              id="password"
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <ErrorMessage
              component="span"
              name="password"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmation">Confirm Password</label>
            <Field
              name="confirmation"
              id="confirmation"
              className="form-control"
              type="password"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              component="span"
              name="confirmation"
              className="text-danger"
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
    </Layout>
  );
}

export default SignIn;
