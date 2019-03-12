const memoize = require('promise-memoize');
const bodyParser = require('body-parser');
const { sign, verify } = require('jsonwebtoken');
const { model: Users } = require('../components/User');
const logger = require('./logger');

const CACHE_MINUTES = 30;
const TOKEN_MINUTES = 5;
const WHITELISTED_PATHS = [
  '/',
  '/login',
  '/start',
];

const findUser = id => Users.findById(id);
const cachedFindUser = memoize(findUser, { maxAge: 60 * 1000 * CACHE_MINUTES });

const generateToken = async (req, res) => {
  if (!req.body) {
    return res.status(403).send({ auth: false, error: 'Empty request' });
  }

  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(403).send({ auth: false, error: 'Login credential not found. Try again' });
  }

  const isValid = user.validatePassword(req.body.password) && user.active;

  if (isValid) {
    const token = sign({ id: user.id }, process.env.SECRET_JWT, {
      expiresIn: 60 * TOKEN_MINUTES,
    });
    return res.status(200).send({ auth: true, token });
  }

  const error = !user.active ? 'User is inactive. Please contact the system administrator.'
    : 'Login credential not found. Try again.';

  logger.error(error);
  return res.status(403).send({ auth: false, error });
};

const verifyToken = async (req, res, next) => {
  if (WHITELISTED_PATHS.includes(req.path)) {
    return next();
  }
  const token = req.headers['x-access-token'];

  if (!token) {
    logger.error(`No token provided! Header: ${JSON.stringify(req.headers)}`);
    return res.status(401).send({ auth: false, error: 'Error. No token provided!' });
  }

  try {
    const { id } = await verify(token, process.env.SECRET_JWT);
    const user = await cachedFindUser(id);

    if (!user) {
      logger.error(`User not found: ${id}`);
      return res.send(403).send({ auth: false, error: 'User not found' });
    }

    if (!user.active) {
      logger.error(`User Inactive: ${id}`);
      return res.send(403).send({ auth: false, error: 'User is inactive. Please contact the system administrator' });
    }

    return next();
  } catch (err) {
    logger.error(err);
    return res.status(403).send({ auth: false, error: 'Failed to authenticate token' });
  }
};

module.exports = (app) => {
  app.use(bodyParser.json());
  app.post('/login', generateToken);
  app.post('/logout', (req, res) => res.status(200).send({ auth: false, token: null }));
  app.use(verifyToken);
};