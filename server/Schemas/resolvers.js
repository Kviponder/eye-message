const { gql } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Message } = require("../models");

const users = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane@example.com",
  },
  // Add more user data here
];

const resolvers = {
  Query: {
    user: (parent, { id }) => {
      return users.find((user) => user.id === id);
    },
    users: () => {
      return users;
    },
  },
  Mutation: {
    createUser: (parent, { username, email }) => {
      const newUser = {
        id: String(users.length + 1),
        username,
        email,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

module.exports = resolvers;
