import React, { useEffect } from "react";
import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import CheckoutSteps from "../components/CheckoutSteps";
import { IInitialState } from "../types/main-interfaces";
import addDecimals from "../utils/addDecimals";

interface OrderProps {
  history: {
    push: (url: string) => void;
  };
}

const OrderPage: React.FC<OrderProps> = ({ history }) => {
  const cart = useSelector((state: IInitialState) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );
  const { userDetails } = loggedInUser;

  useEffect(() => {
    if (!userDetails) {
      history.push("/login?redirect=shipping");
    }
  });

  const handlePlaceOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Empty state
    // Make HTTP Request to backend
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty!,
    0
  );
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 100);

  const taxPrice = (0.15 * itemsPrice).toFixed(2);

  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 && (
                <AlertMessage variant="danger">
                  <p>Your cart is empty.</p>
                </AlertMessage>
              )}
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty! * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
