const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    token: String
    messages: [Message]
    friends: [User]
  }

  type Message {
    _id: ID!
    messageText: String!
    createdAt: String!
    userID: User!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    userByName(username: String!): User
    friend(username: String!): User
    friends: [User]
    message(id: ID!): Message
    messages: [Message]
    isLoggedIn: Boolean
    isFriend: Boolean
  }

  input CreateMessageInput {
    messageText: String!
    userID: ID!
  }

  input AddFriendInput {
    userId: ID!
    friendId: ID!
  }

  type Auth {
    token: String
    user: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createMessage(input: CreateMessageInput!): Message
    addFriend(input: AddFriendInput!): User
    removeFriend(username: String!): User
    login(email: String!, password: String!): Auth
    logout: User
  }
`;

module.exports = typeDefs;
