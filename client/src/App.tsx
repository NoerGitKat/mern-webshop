import React from "react";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/home";
import ProductPage from "./pages/product";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/:id" component={ProductPage} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
