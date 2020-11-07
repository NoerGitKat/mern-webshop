import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logUserOut } from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";

const Header: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );
  const { userDetails } = loggedInUser;

  const logoutUser = () => {
    dispatch(logUserOut());
  };

  useEffect(() => {}, []);

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MernShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userDetails ? (
                <NavDropdown title={userDetails.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile <i className="far fa-user-circle"></i>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutUser}>
                    Logout <i className="fas fa-sign-out-alt"></i>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userDetails && userDetails.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>All Users</NavDropdown.Item>
                  </LinkContainer>{" "}
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>All Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>All Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
