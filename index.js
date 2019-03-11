const express = require('express');
const routes = require('./src/routes');
const { logger, graphQL } = require('./src/utils');

const app = express();

routes(app);
graphQL(app);

if (process.env.SECRET_KEY.length !== 32) {
  throw new Error('Your SECRET_KEY length must be equal to 32 characters. Try generate one using `npm run generate`');
}

logger.debug('Starting API');

module.exports = app;
