import authInstance from "../utils/Auth";
import { Container, Row, Col } from "react-bootstrap";

const friendProfile = () => {
  const username = authInstance.getUsername();
  const loggedIn = authInstance.loggedIn();

  
  return (
    <Container className="Cont">
      <Row className="Row">
        <Col className="Col">
          {loggedIn ? (
            <div className="Dashboard">
              <h1 className="profile-title">friendProfile</h1>
              <h2 className="profile-welcome">Welcome, {username}!</h2>
              <h3>You have successfully visited the friend's page</h3>
            </div>
          ) : (
            <h1 className="not-logged-in-message">
              You are not logged in, loser
            </h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default friendProfile;
