import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; MernShop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
