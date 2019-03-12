/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
const NodeEnvironment = require('jest-environment-node');
const chalk = require('chalk');
const { join } = require('path');
const { readFileSync } = require('fs');

const globalConfigPath = join(__dirname, 'globalConfig.json');
const { log } = console;

class MongoEnvironment extends NodeEnvironment {
  async setup() {
    log(chalk`{green.bold Starting MongoDB Environment}`);
    const { mongoUri, mongoDBName } = JSON.parse(readFileSync(globalConfigPath, 'utf8'));

    this.global.__MONGO_URI__ = mongoUri;
    this.global.__MONGO_DB_NAME__ = mongoDBName;

    await super.setup();
  }

  async teardown() {
    log(chalk`{yellow.bold Teardown MongoDB Environment}`);
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
