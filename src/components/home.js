import { Container, Row, Col } from "react-bootstrap";
import { link } from "react-router-dom";

export default function home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Home</h1>
          <p>Welcome to the Home page.</p>{" What"}
        </Col>
      </Row>
    </Container>
  );
}
