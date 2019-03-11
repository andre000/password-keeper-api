const Password = require('./model');
const { decrypt } = require('../../utils/cypher');

module.exports = {
  Query: {
    password: async (root, args) => Password.findOne(args),
    passwords: (root, args = {}) => Password.find(args),
    decrypt: (root, { value }) => decrypt(value),
    decryptMany: (root, { value }) => value.map(v => decrypt(v)),
  },

  Mutation: {
    addPassword: async (root, args) => {
      const newPassword = new Password(args);
      return newPassword.save();
    },
    editPassword: (root, { _id, ...args }) => Password.findOneAndUpdate(_id, { $set: args }),

    deletePassword: (root, args) => Password.findOneAndRemove(args),
  },
};
