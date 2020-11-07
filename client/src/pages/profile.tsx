import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import { getMyOrders } from "../redux/actions/orders-actions";
import {
  getProfile,
  logUserOut,
  updateProfile,
} from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";
import { IOrder } from "../types/orders-interfaces";

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

  const myOrders = useSelector((state: IInitialState) => state.myOrders);
  const { loading: myOrdersLoading, error: myOrdersError, orders } = myOrders;

  let errorMessages;
  if (error) {
    errorMessages =
      error.length >= 1
        ? error.map((error: any, index: number) => (
            <AlertMessage key={index} variant="danger">
              {error.msg}
            </AlertMessage>
          ))
        : null;
  }

  let orderErrorMsg;
  if (myOrdersError) {
    orderErrorMsg =
      myOrdersError.length >= 1
        ? myOrdersError.map((error: any, index: number) => (
            <AlertMessage key={index} variant="danger">
              {error.msg}
            </AlertMessage>
          ))
        : null;
  }

  useEffect(() => {
    if (error && error[0].msg) {
      if (error[0].msg === "jwt expired") {
        dispatch(logUserOut());
        history.push("/login");
      } else if (error[0].msg === "invalid signature") {
        dispatch(logUserOut());
        history.push("/login");
      }
    }
    // check if user is logged in. If not redirect to /login
    if (!userDetails) {
      history.push("/login");
    } else {
      if (!userProfile || !userProfile.username) {
        dispatch(getMyOrders(userDetails.token));
        dispatch(getProfile(userDetails.token));
      } else {
        setUsername(userProfile.username as string);
        setEmail(userProfile.email as string);
        setPassword("");
        setConfirmPassword("");
      }
    }
  }, [dispatch, history, userDetails, userProfile, error, orders]);

  const updateProfileHandler = (event: any) => {
    event.preventDefault();

    dispatch(updateProfile(userDetails.token, { username, email, password }));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Your Profile</h2>
        {errorMessages}
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
        {myOrdersError && orderErrorMsg}
        {myOrdersLoading ? (
          <Loader />
        ) : orders.length > 0 ? (
          <Table striped bordered hover responsive className="table-sm">
            <TableHead
              tableHeaders={["ID", "DATE", "TOTAL", "PAID", "DELIVERED", ""]}
            />
            <TableBody data={orders} />
          </Table>
        ) : (
          orders.length === 0 && <p>There are no orders yet.</p>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
