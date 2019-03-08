const express = require('express');
const routes = require('./src/routes');
const { logger, graphQL } = require('./src/utils');

const app = express();

routes(app);
graphQL(app);

if (process.env.SECRET_KEY.length < 20) {
  throw new Error('Your SECRET_KEY must be greater than 20 characters. Try generate one using `npm run generate`');
}

logger.debug('Starting API');

module.exports = app;
