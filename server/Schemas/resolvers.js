const { gql } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Message } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      try {
        return await User.findById(id).populate("messages");
      } catch (err) {
        throw new Error(`Failed to fetch user: ${err}`);
      }
    },
    users: async () => {
      try {
        return await User.find().populate("messages");
      } catch (err) {
        throw new Error(`Failed to fetch users: ${err}`);
      }
    },
    message: async (parent, { id }) => {
      try {
        return await Message.findById(id).populate("username");
      } catch (err) {
        throw new Error(`Failed to fetch message: ${err}`);
      }
    },
    messages: async () => {
      try {
        return await Message.find().populate("username");
      } catch (err) {
        throw new Error(`Failed to fetch messages: ${err}`);
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(`Failed to create user: ${err}`);
      }
    },
    createMessage: async (parent, { messageText, username }) => {
      try {
        const message = await Message.create({ messageText, username });
        const user = await User.findByIdAndUpdate(
          { _id: username },
          { $push: { messages: message._id } },
          { new: true }
        );
        return message;
      } catch (err) {
        throw new Error(`Failed to create message: ${err}`);
      }
    },
  },
};

module.exports = resolvers;
