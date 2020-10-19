import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

interface HomeProps {}

const HomePage: React.FC<HomeProps> = ({}) => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product
              _id={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              category={product.category}
              price={product.price}
              numReviews={product.numReviews}
              brand={product.brand}
              countInStock={product.countInStock}
              rating={product.rating}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
