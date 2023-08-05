const { User } = require('../models');

const resolvers = {
  Query: {
    allUsers: async (parent, args, context) => {
      return await User.find({});
    }
  }
}

module.exports = resolvers;