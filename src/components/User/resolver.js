const { NotFoundError } = require('../../utils/errors');
const User = require('./model');

module.exports = {
  Query: {
    user: async (root, args) => User.findOne(args),
    users: (root, args = {}) => User.find(args),
    validateUserPassword: async (root, { password, ...args }) => {
      const user = await User.findOne(args);
      if (!user) throw new NotFoundError('User not found');

      return user.validatePassword(password);
    },
  },

  Mutation: {
    addUser: async (root, args) => {
      const newUser = new User(args);
      return newUser.save();
    },
    editUser: (root, { _id, ...args }) => User.findOneAndUpdate(_id, { $set: args }),

    deleteUser: (root, args) => User.findOneAndRemove(args),
  },
};
