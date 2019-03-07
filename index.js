const express = require('express');
const routes = require('./src/routes');
const { logger } = require('./src/utils');

const app = express();
routes(app);

logger.debug('Starting API');

module.exports = app;
