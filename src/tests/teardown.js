/* eslint-disable no-underscore-dangle */
module.exports = async () => {
  await global.__MONGOD__.stop();
};
