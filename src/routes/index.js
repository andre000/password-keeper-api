const { logger } = require('../utils');
const { model: User } = require('../components/User');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/start', async (req, res) => {
    const users = await User.find({});
    if (users.length > 0) return res.status(403).send({ success: false, message: 'The first user was already created. If you want to create a new user, use the GraphQL endpoint.' });

    const { name, email, password } = req.body;
    if (!name) return res.status(400).send({ success: false, message: 'You must fill the `name` field' });
    if (!email) return res.status(400).send({ success: false, message: 'You must fill the `email` field' });
    if (!password) return res.status(400).send({ success: false, message: 'You must fill the `password` field' });
    if (password.length < 6) return res.status(400).send({ success: false, message: 'Password must be bigger than 6 characters!' });

    try {
      const user = new User({
        name, email, password, active: true,
      });
      await user.save();
    } catch (err) {
      logger.error(err);
      return res.status(500).send({ success: false, message: 'An error has occurred. Try again later' });
    }

    return res.status(200).send({ success: true, message: 'User created with success!' });
  });
};
