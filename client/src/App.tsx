import React from "react";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome to MernShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
