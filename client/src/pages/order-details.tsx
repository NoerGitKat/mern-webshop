import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  resetOrderPay,
} from "../redux/actions/orders-actions";
import { logUserOut } from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";
import { IProduct } from "../types/products-interfaces";

interface OrderDetailsProps {
  match: { params: { id: string } };
  history: { push: (url: string) => void };
}

const OrderDetailsPage: React.FC<OrderDetailsProps> = ({ history, match }) => {
  const orderId = match.params.id;

  const [isSDKReady, setIsSDKReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state: any) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );
  const { userDetails } = loggedInUser;

  const orderPay = useSelector((state: IInitialState) => state.orderPay);
  const { success, loading: loadingPay } = orderPay;

  const paypalSuccessHandler = (paymentResult: any) => {
    console.log("paymentResult", paymentResult);
    dispatch(payOrder(orderId, userDetails.token, paymentResult));
  };

  useEffect(() => {
    if (error && error.msg) {
      if (error.msg === "jwt expired") {
        dispatch(logUserOut());
        history.push("/login");
      } else if (error.msg === "invalid signature") {
        dispatch(logUserOut());
        history.push("/login");
      } else if (error.msg === "Couldn't find order.") {
        history.push("/");
      }
    }

    const addPayPalSDK = async (): Promise<void> => {
      try {
        const response = await fetch("/api/config/paypal");
        const clientId = await response.json();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setIsSDKReady(true);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.log("error is...", error);
      }
    };

    addPayPalSDK();

    // Redirect to home if orderId is invalid
    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      history.push("/");
    }

    if (!userDetails) {
      history.push("/login");
    } else if (!order || order._id !== orderId || success) {
      dispatch(resetOrderPay());
      dispatch(getOrderDetails(orderId, userDetails.token));
    } else if (!order.isPaid) {
      if (!(window as any).paypal) {
        addPayPalSDK();
      } else {
        setIsSDKReady(true);
      }
    }
  }, [userDetails, order, dispatch, history, orderId, error, success]);

  return loading ? (
    <Loader />
  ) : error || !order ? (
    <AlertMessage variant="danger">
      <p>Something went wrong.</p>
    </AlertMessage>
  ) : (
    <>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.username}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <AlertMessage variant="success">
                  <span>Delivered on {order.deliveredAt}</span>
                </AlertMessage>
              ) : (
                <AlertMessage variant="danger">
                  <span>Not Delivered</span>
                </AlertMessage>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <AlertMessage variant="success">
                  <span>Paid on {order.paidAt}</span>
                </AlertMessage>
              ) : (
                <AlertMessage variant="danger">
                  <span>Not Paid</span>
                </AlertMessage>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <AlertMessage>
                  <span>Order is empty</span>
                </AlertMessage>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item: IProduct, index: number) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty! * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {isSDKReady && (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={() => {
                      return "";
                    }}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsPage;
