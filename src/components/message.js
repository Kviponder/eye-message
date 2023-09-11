import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Message = ({ text }) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="message">
            <p>{text}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Message;
