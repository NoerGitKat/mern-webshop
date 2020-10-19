import React from "react";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/home";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
