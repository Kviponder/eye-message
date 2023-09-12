const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String
  }

  type Message {
    _id: ID!
    messageText: String!
    createdAt: String!
    username: User!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    message(id: ID!): Message
    messages: [Message]
    isLoggedIn: Boolean
  }

  type Auth {
    token: String
    user: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User    
    createMessage(messageText: String!, username: ID!): Message
    login(email: String!, password: String!): Auth
    logout: User
  }
`;

module.exports = typeDefs;