import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { listSingleProduct } from "../redux/actions/product-actions";
import { IProductDetails } from "../types/products-interfaces";

interface ProductProps {
  history: {
    push(url: string): void;
  };
  match: { params: { id: string } };
}

const ProductPage: React.FC<ProductProps> = ({
  history,
  match,
}): JSX.Element => {
  const productId = match.params.id;
  const { push } = history;

  const [qty, setQty] = useState("1");
  const dispatch = useDispatch();
  const productDetails = useSelector((state: any) => state.productDetails);
  const { product, loading, error }: IProductDetails = productDetails;

  useEffect(() => {
    dispatch(listSingleProduct(productId));
  }, [productId, dispatch]);

  const changeQuantity = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = event;
    setQty(value);
  };

  const optsElements: JSX.Element[] = [
    ...Array(product.countInStock).keys(),
  ].map((_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ));

  const addToCartHandler = () => {
    push(`/cart/${productId}?qty=${qty}`);
  };

  if (!product) {
    return <>No product found!</>;
  } else {
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <AlertMessage variant="danger">{error}</AlertMessage>
          ) : (
            <>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      text={` ${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Description</strong>: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={changeQuantity}
                            >
                              {optsElements}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </>
    );
  }
};

export default ProductPage;
