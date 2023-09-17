const { gql } = require("@apollo/client");

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      token
      email
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($messageText: String!, $username: ID!) {
    createMessage(messageText: $messageText, username: $username) {
      messageText
      username {
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($username: String!) {
    addFriend(username: $username) {
      username
      friends {
        username
        _id
        friends {
          friends {
            username
            _id
          }
        }
      }
    }
  }
`;


