const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

logger.info('Initializing Connection...');

const db = mongoose.connection;
db.on('error', e => logger.error(e));
db.once('open', () => logger.info('Connected to the database!'));

module.exports = db;
