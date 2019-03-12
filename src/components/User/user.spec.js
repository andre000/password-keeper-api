const testDB = require('../../tests/connection');
const { Query, Mutation } = require('./resolver');

beforeAll(async () => {
  await testDB.connect();
});

afterAll(async () => {
  await testDB.disconnect();
});

const mockUser = {
  name: 'Test User',
  email: 'test@test.com',
  password: 'test123',
};

describe('User Resolver', () => {
  test('should be able to create an user', async () => {
    await Mutation.addUser(null, mockUser);
    const { email } = await Query.user(null, { email: mockUser.email });

    expect(email).toBe(mockUser.email);
  });

  test('should be able to retrieve an user', async () => {
    const user = await Query.user(null, { name: mockUser.name });
    expect(user.name).toBe(mockUser.name);
  });

  test('should be able to retrieve multiple users', async () => {
    const users = await Query.users();
    expect(Array.isArray(users)).toBe(true);
  });

  test('should be able to validate the user password', async () => {
    const isValid = await Query
      .validateUserPassword(null, { password: mockUser.password, email: mockUser.email });
    expect(isValid).toBe(true);
  });

  test('should throw an error when validating an non existent user', async () => {
    expect(Query
      .validateUserPassword(null, { password: mockUser.password, email: 'this@doesntexist.com' }))
      .rejects.toThrow('User not found');
  });

  test('should be able to edit an user', async () => {
    // Testing query for multiple users
    const users = await Query.users(null, { email: mockUser.email });
    const { _id } = users[0];
    const { email } = await Mutation.editUser(null, { _id, email: 'test2@test.com' });

    expect(email).toBe('test2@test.com');
  });

  test('should be able to delete an user', async () => {
    const { _id } = await Query.user({ email: 'test2@test.com' });
    await Mutation.deleteUser(_id);
    const user = await await Query.user({ email: 'test2@test.com' });

    expect(!!user).toEqual(false);
  });
});
