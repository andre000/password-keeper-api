const express = require('express');
const routes = require('./src/routes');
const { logger, graphQL, auth } = require('./src/utils');

const app = express();

auth(app);
routes(app);
graphQL(app);

if (process.env.SECRET_KEY.length !== 32 && process.env.NODE_ENV !== 'test') {
  const error = 'Your SECRET_KEY length must be equal to 32 characters. Try generate one using `npm run generate` ';
  logger.error(error + process.env.SECRET_KEY);
  throw new Error(error);
}

if (process.env.SECRET_JWT.length < 32 && process.env.NODE_ENV !== 'test') {
  const error = 'Your SECRET_JWT length must be greater than 32 characters. Try generate one using `npm run generate` ';
  logger.error(error + process.env.SECRET_JWT);
  throw new Error(error);
}

logger.debug('Starting API');

module.exports = app;
