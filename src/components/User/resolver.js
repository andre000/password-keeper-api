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
    editUser: async (root, { _id, ...args }) => {
      await User.findOneAndUpdate({ _id }, { $set: args });
      return User.findById(_id);
    },

    deleteUser: (root, args) => User.findOneAndRemove(args),
  },
};
