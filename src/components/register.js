import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register(props) {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  // Function executed after the form is submmitted
  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetail = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    axios
      .post("http://localhost:5000/register", { userDetail })
      .then((response) => {
        if (response.status === 201) {
          props.gotoProfile();
        }
        if (response.status === 401) {
          alert("User exists");
        }
      });
  };

  return (
    <div>
      {/* if flag is 1 */}
      {props.flag ? (
        <Redirect to="/profile" />
      ) : (
        // if flag is 0 render register
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          {/* Name */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={nameValue}
                onChange={onChangeName}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onChangeEmail}
                value={emailValue}
              />
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={onChangePassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="outline-primary" onClick={props.login}>
              Go to Login
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Register;
