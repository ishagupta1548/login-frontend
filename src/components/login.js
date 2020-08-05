import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login(props) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetail = {
      email: emailValue,
      password: passwordValue,
    };
    axios // Post request to the server for login
      .post("http://localhost:5000/login", { userDetail })
      .then((response) => {
        if (response.status === 200) {
          props.gotoProfile();
        }
        if (response.status === 400) {
          alert("Invalid password");
        }
      });
  };

  if (props.flag === 0) {
    return <Redirect to="/" />; // To register because user does not exist
  } else if (props.flag === 1) {
    return <Redirect to="/profile" />;
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={emailValue}
                onChange={onChangeEmail}
              />
            </Form.Group>

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
            <Button variant="outline-primary" onClick={props.register}>
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
