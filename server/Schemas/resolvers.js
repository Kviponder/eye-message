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
    userByName: async (parent, { username }) => {
      try {
        return await User.findOne({ username }).populate("messages");
      } catch (err) {
        throw new Error(`Failed to fetch user: ${err}`);
      }
    },

    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error(`Failed to fetch users: ${err}`);
      }
    },
    message: async (parent, { id }) => {
      try {
        return await Message.findById(id);
      } catch (err) {
        throw new Error(`Failed to fetch message: ${err}`);
      }
    },
    messages: async () => {
      try {
        return await Message.find();
      } catch (err) {
        throw new Error(`Failed to fetch messages: ${err}`);
      }
    },
    friend: async (parent, { input }) => {
      try {
        const { username } = input;
        return await User.findOne({ username }).populate("friends");
      } catch (err) {
        throw new Error(`Failed to fetch friend: ${err}`);
      }
    },
    friends: async () => {
      try {
        return await User.find().populate("friends");
      } catch (err) {
        throw new Error(`Failed to fetch friends: ${err}`);
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
      if (!user) {
        throw new Error("User not found");
      }
    },
    // createMessage: async (parent, args, context, { input }) => {
    //   // if (!context.user) {
    //   //   throw new AuthenticationError("Authentication required.");
    //   // }
    //   try {
    //     args.user = context.user.username;

    //     // Find the user by username
    //     // const user = await User.findOne({ username });
    //     const newMessage = await Message.create(args);
    //     return newMessage;
    //   } catch (err) {
    //     throw new Error(`Failed to create message: ${err}`);
    //   }
    // },
    createMessage: async (_, { input }) => {
      try {
        // Validate input
        const { messageText, username } = input;
        if (!messageText || !username) {
          throw new Error("Message text and username are required.");
        }
        // Find the user by username (assuming username is unique)
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }
        // Create a new message
        const newMessage = new Message({
          messageText,
          user: user._id,
        });
        // Save the message to the database
        await newMessage.save();
        // Return the created message with the user
        return {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: user.token,
          },
          messageText: newMessage.messageText,
          createdAt: newMessage.createdAt.toISOString(), // Format date as string
        };
      } catch (error) {
        throw console.log(error);
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
    addFriend: async (_, { input }) => {
      try {
        const { userId, friendId } = input;

        // Find the user and friend by their IDs
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
          throw new Error("User or friend not found");
        }

        // Check if the friend is already in the user's friends list
        if (user.friends.includes(friendId)) {
          throw new Error("Friend is already added");
        }

        // Add the friend to the user's friends list
        user.friends.push(friendId);
        await user.save();

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
