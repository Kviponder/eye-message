import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";

const Navbar = () => {
  const handleLogout = () => {
    Auth.logout(); // Remove the JWT token from local storage
    window.location.replace("/"); // Redirect the user to the homepage or login page
  };

  return (
    <Container>
      <Row>
        <Col>
          {Auth.loggedIn() ? (
            <>
              <Link to="/Dashboard">
                <Button variant="primary">Dashboard</Button>
              </Link>
              <Link to="/MessageList">
                <Button variant="primary">Messages</Button>
              </Link>
              <Link to="/Profile">
                <Button variant="primary">Profile</Button>
              </Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
              <Link to="/Login">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/Signup">
                <Button variant="primary">Signup</Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
