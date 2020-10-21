import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import { IProduct } from "../types/products-interfaces";
import { listProducts } from "../redux/actions/product-actions";

interface HomeProps {}

const HomePage: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {loading ? (
          <Spinner animation={"border"} />
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product: IProduct) => (
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
          ))
        )}
      </Row>
    </>
  );
};

export default HomePage;
