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

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Container className="mt-3">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/shipping" component={ShippingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/cart/:id?" component={CartPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
