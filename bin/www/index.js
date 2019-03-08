require('dotenv').config();
require('../../src/utils/connection');
const app = require('../../index');
const { logger } = require('../../src/utils');

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info('API online'));
