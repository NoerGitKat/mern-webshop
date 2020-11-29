import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../components/Loader";
import AlertMessage from "./../components/AlertMessage";
import { IProductDetails } from "../types/products-interfaces";
import {
  listSingleProduct,
  updateProduct,
} from "../redux/actions/product-actions";
import FormContainer from "../components/FormContainer";
import { IInitialState } from "../types/main-interfaces";

interface IProductEditPageProps {
  history: {
    push(url: string): void;
  };
  match: { params: { id: string } };
}

const ProductEditPage: React.FC<IProductEditPageProps> = ({
  history,
  match,
}) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const productDetails = useSelector(
    (state: { productDetails: IProductDetails }) => state.productDetails
  );

  const { product, loading, error } = productDetails;

  const { userDetails } = useSelector(
    (state: IInitialState) => state.loggedInUser
  );

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listSingleProduct(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [history, dispatch, productId, product]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      updateProduct(userDetails.token, productId, {
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading && !product ? (
          <Loader />
        ) : error ? (
          <AlertMessage variant="danger">{error}</AlertMessage>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
