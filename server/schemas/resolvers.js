const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');



const resolvers = {
  Query: {
    allUsers: async (parent, args, context) => {
      return await User.find({}).populate('savedBooks');
    },
    me: async (parent, args, context) => {
      return await User.findOne({}).populate('savedBooks')
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User Not Found');
      }
      const matchingPassword = await user.isCorrectPassword(password);
      if (!matchingPassword) {
        throw new AuthenticationError('Wrong Password');
      }
      const toke = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        const bookList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookInput } },
          { new: true }
        );
        return bookList
      }
      throw new AuthenticationError('Not Logged In');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const bookList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return bookList;
      }
      throw new AuthenticationError('Not Logged In');
    }
  }
}

module.exports = resolvers;