const express = require('express');
const routes = require('./src/routes');
const { logger, graphQL } = require('./src/utils');

const app = express();

routes(app);
graphQL(app);

logger.debug('Starting API');

module.exports = app;
