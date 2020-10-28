import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "./../components/AlertMessage";
import Loader from "./../components/Loader";
import { logUserIn } from "./../redux/actions/user-actions";
import FormContainer from "../components/FormContainer";

interface LoginProps {
  history: { push(url: string): void };
  location: { search: string };
}

const LoginPage: React.FC<LoginProps> = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: any) => state.loggedInUser);
  const { loading, error, userDetails } = loggedInUser;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // Redirect to homepage if already logged in
    if (userDetails) {
      history.push(redirect);
    }
  }, [history, userDetails, redirect]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(logUserIn({ email, password }));
  };

  const handleEmailChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      target: { value },
    } = event;

    setEmail(value);
  };

  const handlePasswordChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      target: { value },
    } = event;

    setPassword(value);
  };

  let errorMessages;
  if (error) {
    errorMessages =
      error &&
      error.map((message: any, index: number) => (
        <AlertMessage key={index} variant="danger">
          {message.msg}
        </AlertMessage>
      ));
  }

  return (
    <FormContainer>
      <h1>Log Into Your Account</h1>
      {errorMessages}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(event) => handleEmailChange(event)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="'1_am_aw3som3'"
              value={password}
              onChange={(event) => handlePasswordChange(event)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Log In!
          </Button>
        </Form>
      )}

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Create a new account.</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
