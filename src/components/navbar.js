import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import authInstance from "../utils/Auth";

const Navbar = () => {
  const handleLogout = () => {
    authInstance.logout(); // Remove the JWT token from local storage
    window.location.replace("/"); // Redirect the user to the homepage or login page
  };

  return (
    <Container className="Cont">
      <Row className="Row">
        <Col className="Col">
          {authInstance.loggedIn() ? (
            <>
              <Link to="/Dashboard">
                <Button variant="primary" className="btn">
                  Dashboard
                </Button>
              </Link>
              <Link to="/MessageList">
                <Button variant="primary" className="btn">
                  Messages
                </Button>
              </Link>
              <Link to="/Profile">
                <Button variant="primary" className="btn">
                  Profile
                </Button>
              </Link>
              <Button variant="danger" onClick={handleLogout} className="btn">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/">
                <Button variant="primary" className="btn">
                  Home
                </Button>
              </Link>
              <Link to="/Login">
                <Button variant="primary" className="btn">
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button variant="primary" className="btn">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
