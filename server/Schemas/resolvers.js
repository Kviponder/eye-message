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
        return { token, user, username: user.username, email: user.email };
      } catch (err) {
        throw new Error(`Failed to create user: ${err}`);
      }
    },
    createMessage: async (parent, { input }) => {
      try {
        const { messageText, username } = input;
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
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw new AuthenticationError("Incorrect password");
        }

        // Create and return a token here (if needed)
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        throw new AuthenticationError(`Failed to log in!: ${err}`);
      }
    },
  },
};
//   logout: async (parent, args, context) => {
//     try {
//       if (context.user) {
//         const user = await User.findByIdAndUpdate(
//           { _id: context.user._id },
//           { online: false },
//           { new: true }
//         );
//         return user;
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     } catch (err) {
//       throw new AuthenticationError(`Failed to log out: ${err}`);
//     }
//   },
// };

module.exports = resolvers;
