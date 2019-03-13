/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

module.exports = {
  db: null,
  async connect() {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(global.__MONGO_URI__, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    mongoose.Promise = global.Promise;
    this.db = mongoose.connection;
  },

  async disconnect() {
    await mongoose.disconnect();
  },
};
