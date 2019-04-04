const Folder = require('./model');

module.exports = {
  Query: {
    folder: (root, args) => Folder.findOne(args).populate('passwords'),
    folders: (root, args = {}) => Folder.find(args).populate('passwords'),
  },

  Mutation: {
    addFolder: async (root, args) => {
      const newFolder = new Folder(args);
      await newFolder.save();
      return Folder.populate(newFolder, 'passwords');
    },
    editFolder: async (root, { _id, ...args }) => {
      await Folder.findOneAndUpdate({ _id }, { $set: args }, { runValidators: true });
      return Folder.findOne(args).populate('passwords');
    },
    deleteFolder: (root, args) => Folder.findOneAndRemove(args).populate(),
  },
};
