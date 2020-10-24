import React, { ChangeEvent, useEffect } from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { addToCart, removeFromCart } from "../redux/actions/cart-actions";
import { IProduct } from "../types/products-interfaces";

interface cartProps {
  match: { params: { id: string } };
  history: { push(url: string): void };
  location: { search: string };
}

const CartPage: React.FC<cartProps> = ({ match, history, location }) => {
  const productId = match.params.id;
  const { push } = history;
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: { cart: { cartItems: IProduct[] } }) => state.cart
  );
  const { cartItems } = cart;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId && qty) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const changeQuantity = (event: ChangeEvent<any>, productId: string) => {
    const {
      target: { value },
    } = event;

    dispatch(addToCart(productId, Number(value)));
  };

  const removeFromCartHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const subtotalItems = cartItems.reduce((acc, item) => acc + item.qty!, 0);
  const subtotalPrice = cartItems
    .reduce((acc, item) => acc + item.qty! * item.price!, 0)
    .toFixed(2);

  const checkoutHandler = () => {
    push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <AlertMessage>
            <>
              Your cart is empty <Link to="/">Go Back</Link>
            </>
          </AlertMessage>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => {
              return (
                <ListGroup.Item key={item._id + index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(event) => changeQuantity(event, item._id)}
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({subtotalItems}) items</h2>${subtotalPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
