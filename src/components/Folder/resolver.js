const Folder = require('./model');

module.exports = {
  Query: {
    folder: async (root, args) => Folder.findOne(args).populate('passwords'),
    folders: (root, args = {}) => Folder.find(args).populate('passwords'),
  },

  Mutation: {
    addFolder: async (root, args) => {
      const newFolder = new Folder(args);
      newFolder.save();
      return Folder.populate(newFolder, 'passwords');
    },
    editFolder: (root, { _id, ...args }) => Folder.findOneAndUpdate(_id, { $set: args }).populate(),
    deleteFolder: (root, args) => Folder.findOneAndRemove(args).populate(),
  },
};
