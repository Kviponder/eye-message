import authInstance from "../utils/Auth";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  console.log("Auth instance:", authInstance);
  const isUserLoggedIn = authInstance.loggedIn();
  console.log("Is user logged in:", isUserLoggedIn);
  const isTokenExpired = authInstance.isTokenExpired(authInstance.getToken());
  console.log("Is token expired:", isTokenExpired);

  return (
    <Container className="Cont">
      <Row className="Row">
        <Col className="Col">
          {authInstance.loggedIn() ? (
            <h1>Dashboard</h1>
          ) : (
            <h1>You are not logged in</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
