// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import Message from './message';

// const MessageList = ({ messages }) => {
//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h2>Message List</h2>
//           {messages.map((message, index) => (
//             <Message key={index} text={message} />
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MessageList;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Message from './message';

const hardcodedMessages = [
  'Hello, how are you today?',
  'I hope you are having a great day!',
  'This is a sample message.',
  'Feel free to add more messages.',
  'Have a great day!',
  'Goodbye!',
  'See you later!',
  'Good luck!',
];

const MessageList = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Message List</h2>
          {hardcodedMessages.map((message, index) => (
            <Message key={index} text={message} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MessageList;
