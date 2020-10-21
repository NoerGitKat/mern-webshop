import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { listSingleProduct } from "../redux/actions/product-actions";
import { IProductDetails } from "../types/products-interfaces";

interface ProductProps {
  match: { params: { id: string } };
}

const ProductPage: React.FC<ProductProps> = ({ match }): JSX.Element => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const productDetails = useSelector((state: any) => state.productDetails);
  const { product, loading, error }: IProductDetails = productDetails;

  useEffect(() => {
    dispatch(listSingleProduct(productId));
  }, [productId, dispatch]);

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
                    Description: {product.description}
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
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
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
