const { env } = process;
process.env.SECRET_JWT = '000000000000';
process.env.SECRET_KEY = '000000000000';
process.env.GQL_ENDPOINT = '/gql';

const request = require('supertest');
const testDB = require('../tests/connection');
const app = require('../../index');
const { model: User } = require('../components/User');

const mockUser = {
  name: 'Test User',
  email: 'test@test.com',
  password: 'test123',
};

beforeAll(async () => {
  await testDB.connect();
  await new User(mockUser).save();
});

afterAll(async () => {
  process.env = env;
  await User.findOneAndDelete({ email: mockUser.email });
  await testDB.disconnect();
});

describe('Authentication Utility', () => {
  describe('Generate Token', () => {
    test('should return an error when trying to generate a token without data', async () => {
      try {
        await request(app).post('/login');
      } catch ({ status, response }) {
        expect(status).toBe(403);
        expect(response.body).toEqual({ auth: false, error: 'Empty request' });
      }
    });

    test('should return an error when trying to login with an user that doesn\'t exist', async () => {
      try {
        await request(app)
          .post('/login')
          .send({ email: 'notauser@test.com' });
      } catch ({ status, response }) {
        expect(status).toBe(403);
        expect(response.body).toEqual({ auth: false, error: 'Login credential not found. Try again' });
      }
    });

    test('should return an error when trying to login with an wrong password', async () => {
      try {
        await request(app)
          .post('/login')
          .send({ email: mockUser.email, password: 'wrongpass' });
      } catch ({ status, response }) {
        expect(status).toBe(403);
        expect(response.body).toEqual({ auth: false, error: 'Login credential not found. Try again' });
      }
    });

    test('should return an error when trying to login with an inactive user', async () => {
      await User.findOneAndUpdate({ email: mockUser.email, $set: { active: false } });
      try {
        await request(app)
          .post('/login')
          .send({ email: mockUser.email, password: mockUser.password });
      } catch ({ status, response }) {
        await User.findOneAndUpdate({ email: mockUser.email, $set: { active: true } });
        expect(status).toBe(403);
        expect(response.body).toEqual({ auth: false, error: 'User is inactive. Please contact the system administrator.' });
      }
    });

    test('should return a token with user ID when user successfully logged in', async () => {
      await User.findOneAndUpdate({ email: mockUser.email, $set: { active: true } });
      const { status, body } = await request(app).post('/login').send({
        email: mockUser.email,
        password: mockUser.password,
      });

      expect(status).toBe(200);
      expect(body.auth).toEqual(true);
      expect(body.token.length).toBeGreaterThanOrEqual(50);
      expect(!!body.user).toBe(true);
    });
  });

  describe('Verify Token', () => {
    let token;
    beforeAll(async () => {
      process.env.NODE_ENV = 'development';
      const { body } = await request(app).post('/login').send({
        email: mockUser.email,
        password: mockUser.password,
      });
      // eslint-disable-next-line prefer-destructuring
      token = body.token;
    });

    afterAll(() => {
      process.env.NODE_ENV = 'test';
    });

    test('should not require token when path is whitelisted', async () => {
      const { status } = await request(app).get('/');
      expect(status).toBe(200);
    });

    test('should return an erron when trying to use the API unauthenticated', async () => {
      const { status, body } = await request(app).post('/gql').send({ query: '{ users { _id } }' });
      expect(status).toBe(401);
      expect(body).toEqual({ auth: false, error: 'Error. No token provided!' });
    });

    test('should successfully retrive data when authenticated', async () => {
      const { status, body } = await request(app)
        .post('/gql')
        .set('authorization', token)
        .send({ query: '{ users { _id } }' });

      expect(status).toBe(200);
      expect(!!body.data).toBe(true);
    });
  });
});
