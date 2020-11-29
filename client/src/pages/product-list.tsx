import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import TableHead from "../components/TableHead";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../redux/actions/product-actions";
import { logUserOut } from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";
import { IProduct, IProductList } from "../types/products-interfaces";

interface IProductListPageProps {
  history: {
    push: (url: string) => void;
  };
}

const ProductListPage: React.FC<IProductListPageProps> = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state: IInitialState) => state.productList);
  const {
    products,
    loading,
    error,
    successDelete,
    successCreate,
  }: IProductList = productList;

  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );
  const { userDetails } = loggedInUser;

  useEffect(() => {
    if (userDetails && userDetails.isAdmin && error !== "jwt expired") {
      dispatch(listProducts());
    } else {
      dispatch(logUserOut());
      history.push("/");
    }
  }, [dispatch, error, history, userDetails, successDelete, successCreate]);

  const handleDelete = (token: string, id: string) => {
    if (window.confirm("Are you sure you want to remove this product?"))
      dispatch(deleteProduct(token, id));
  };

  const createNewProduct = (token: string, productDetails: IProduct) => {
    dispatch(createProduct(token, productDetails));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>All Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3">
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading && <Loader />}

      <Table striped bordered hover responsive className="table-sm">
        <TableHead
          tableHeaders={["ID", "NAME", "PRICE", "CATEGORY", "BRAND"]}
        />
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => handleDelete(userDetails.token, product._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListPage;
