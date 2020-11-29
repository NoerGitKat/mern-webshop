import React from "react";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/home";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import ShippingPage from "./pages/shipping";
import PaymentPage from "./pages/payment";
import OrderDetailsPage from "./pages/order-details";
import PlaceOrderPage from "./pages/place-order";
import UserListPage from "./pages/user-list";
import UserEditPage from "./pages/user-edit";
import ProductListPage from "./pages/product-list";
import ProductEditPage from "./pages/product-edit";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Container className="mt-3">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/shipping" component={ShippingPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/order" component={PlaceOrderPage} />
          <Route exact path="/order/:id" component={OrderDetailsPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/cart/:id?" component={CartPage} />
          <Route exact path="/admin/users" component={UserListPage} />
          <Route exact path="/admin/products" component={ProductListPage} />
          <Route exact path="/admin/users/:id/edit" component={UserEditPage} />
          <Route
            exact
            path="/admin/products/:id/edit"
            component={ProductEditPage}
          />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
