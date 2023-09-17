import authInstance from "../utils/Auth";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const username = authInstance.getUsername();
  const loggedIn = authInstance.loggedIn();
  return (
    <Container className="Cont">
      <Row className="Row">
        <Col className="Col">
          {loggedIn ? (
            <div className="Dashboard">
              <h1>Dashboard</h1>
              <h2>Welcome, {username}!</h2>
              <h3> You have successfully logged in</h3>
            </div>
          ) : (
            <h1>You are not logged in loser</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
