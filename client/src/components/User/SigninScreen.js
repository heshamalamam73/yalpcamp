import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { validationFunc } from "../helper/validationForms.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin, Rigester } from "../../action/userAction.js";

function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const userRigester = useSelector((state) => state.userRigester);
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const { loading2, data, error2 } = userRigester;

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const signup = props.match.url === "/signup" ? true : false;
  useEffect(() => {
    if (userInfo || data) {
      props.history.push(redirect);
    }

    validationFunc();

    return () => {
      //
    };
  }, [userInfo, data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    signup
      ? dispatch(Rigester(email, password, name))
      : dispatch(signin(email, password));
  };
  return (
    <Container className="create-camp">
      <Row>
        <Form
          className="form needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1>{signup ? "Sign up" : "Sign In"}</h1>
          <hr />
          {loading || (loading2 && <Alert color="info">Loading....</Alert>)}
          {error && <Alert color="warning">Invaled Email or Password</Alert>}
          {error2 && <Alert color="warning">Invaled Email or Password</Alert>}

          <Form.Group controlId="Email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="passord">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {signup && (
            <React.Fragment>
              <Form.Group controlId="passord">
                <Form.Label>RePassword</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="RePassword"
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User NAme"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </React.Fragment>
          )}

          <Button variant="success" type="submit">
            {signup ? "Sign Up" : "Sign In"}
          </Button>
          <hr />
          <a href={signup ? "/signin" : "/signup"}>
            {signup
              ? "Have Un Account ? sign in "
              : "Don't have un account ? sign up"}
          </a>
        </Form>
      </Row>
    </Container>
  );
}

export default SignInScreen;
