import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "./../components/AlertMessage";
import Loader from "./../components/Loader";
import { registerUser } from "./../redux/actions/user-actions";
import FormContainer from "../components/FormContainer";
import { IInitialState } from "../types/main-interfaces";

interface RegisterProps {
  history: { push(url: string): void };
  location: { search: string };
}

const RegisterPage: React.FC<RegisterProps> = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const registeredUser = useSelector(
    (state: IInitialState) => state.registeredUser
  );
  const { loading, error, userDetails } = registeredUser;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // Redirect to homepage if already logged in
    if (userDetails) {
      history.push(redirect);
    }
  }, [history, userDetails, redirect]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  const handleUsernameChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      target: { value },
    } = event;

    setUsername(value);
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
      <h1>Create An Account</h1>
      {errorMessages}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="TheTerminator"
              value={username}
              onChange={(event) => handleUsernameChange(event)}
            ></Form.Control>
          </Form.Group>
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
            Register
          </Button>
        </Form>
      )}

      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Log in.</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
