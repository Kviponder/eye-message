import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-center">
      <Container className="form-container">
        <Row>
          <Col>
            <h1>Instant Messaging App</h1>
            <p>Welcome to the Instant Messaging App.</p>
            <Link to="/Login">
              <button className="home-btn">Log In</button>
            </Link>
            <Link to="/Signup">
              <button className="home-btn">Sign Up</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
