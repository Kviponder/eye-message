import { Container, Row, Col } from "react-bootstrap";
import Message from "./message";
import authInstance from "../utils/Auth";

const hardcodedMessages = [
  "Hello, how are you today?",
  "I hope you are having a great day!",
  "This is a sample message.",
  "Feel free to add more messages.",
  "Have a great day!",
  "Goodbye!",
  "See you later!",
  "Good luck!",
];

const MessageList = () => {
  const loggedIn = authInstance.loggedIn();
  return (
    <Container>
      <Row>
        <Col>
          {loggedIn ? (
            <div className="messageList">
              <h2>Message List</h2>
              {hardcodedMessages.map((message, index) => (
                <Message key={index} text={message} />
              ))}
            </div>
          ) : (
            <div className="messageList">
              <h1>You are not logged in loser</h1>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MessageList;
