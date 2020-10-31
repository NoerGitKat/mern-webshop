import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/actions/cart-actions";
import { IInitialState } from "../types/main-interfaces";

interface PaymentProps {
  history: {
    push: (url: string) => void;
  };
}

const PaymentPage: React.FC<PaymentProps> = ({ history }) => {
  const cart = useSelector((state: IInitialState) => state.cart);
  const { shippingAddress } = cart;

  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress) {
    history.push("/shipping");
  }

  useEffect(() => {
    if (!loggedInUser.userDetails) {
      history.push("/login?redirect=shipping");
    }
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method:</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or credit card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
