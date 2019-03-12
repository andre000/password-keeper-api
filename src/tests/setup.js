/* eslint-disable no-underscore-dangle */
const { join } = require('path');
const { writeFileSync } = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');

const globalConfigPath = join(__dirname, 'globalConfig.json');

const mongod = new MongoMemoryServer({
  autoStart: false,
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const config = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getConnectionString(),
  };

  writeFileSync(globalConfigPath, JSON.stringify(config));
  global.__MONGOD__ = mongod;
};
