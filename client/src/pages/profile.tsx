import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { getProfile } from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";

interface ProfileProps {
  history: {
    push(url: string): void;
  };
}

const ProfilePage: React.FC<ProfileProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );
  const { userDetails } = loggedInUser;

  const profile = useSelector((state: IInitialState) => state.profile);
  const { loading, error, userProfile } = profile;

  if (error) {
    if (error.msg === "jwt expired'") {
      history.push("/login");
    }
  }

  useEffect(() => {
    // check if user is logged in. If not redirect to /login
    if (!userDetails) {
      history.push("/login");
    } else {
      if (userProfile.username.length <= 1) {
        dispatch(getProfile(userDetails.token));
      } else {
        setUsername(userProfile.username as string);
        setEmail(userProfile.email as string);
      }
    }
  }, [dispatch, history, userDetails, userProfile]);

  const updateProfileHandler = (event: any) => {};

  return (
    <Row>
      <Col md={3}>
        <h2>Your Profile</h2>
        {loading && <Loader />}
        <Form onSubmit={updateProfileHandler}>
          <Form.Group controlId="name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Your Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
