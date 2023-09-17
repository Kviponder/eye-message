import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import authInstance from "../utils/Auth";

const Message = ({ text }) => {
  const username = authInstance.getUsername();
  return (
    <Container>
      <Row>
        <Col>
          <div className="message">
            <p>{text}</p>
            <caption>Message sent by: {username}</caption>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Message;
