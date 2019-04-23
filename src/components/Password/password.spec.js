/* eslint-disable no-underscore-dangle */
const testDB = require('../../tests/connection');
const { Query, Mutation } = require('./resolver');

const environment = { ...process.env };
process.env.SECRET_KEY = '00000000000000000000000000000000';

beforeAll(async () => {
  await testDB.connect();
});

afterAll(async () => {
  process.env = environment;
  await testDB.disconnect();
});

const mockPassword = {
  title: 'Test Field',
  icon: 'fa-test',
  username: 'test',
  fields: [
    {
      title: 'Field1',
      value: 'password123',
    },
    {
      title: 'Field2',
      value: 'password321',
    },
  ],
  notes: { text: 'Test note' },
};

describe('Password Resolver', () => {
  test('should be able to save a password', async () => {
    const password = await Mutation.addPassword(null, mockPassword);
    expect(!!password._id).toBe(true);
  });

  test('should be able to retrive a password', async () => {
    const { title } = await Query.password({ title: mockPassword.title });
    expect(title).toBe(mockPassword.title);
  });

  test('should save fields with encrypted values', async () => {
    const { fields } = await Query.password({ title: mockPassword.title });
    expect(fields[0].value).not.toBe(mockPassword.fields[0].value);
  });

  test('should be able to search multiple passwords', async () => {
    const passwords = await Query.passwords();
    expect(Array.isArray(passwords)).toBe(true);

    const passwordsWithArgs = await Query.passwords(null, { title: mockPassword.title });
    expect(Array.isArray(passwordsWithArgs)).toBe(true);
  });

  test('should be able to decript a field', async () => {
    const { fields } = await Query.password();
    const decrypted = Query.decrypt(null, { value: fields[0].value });

    expect(decrypted).toBe(mockPassword.fields[0].value);
  });

  test('should be able to decript multiple fields', async () => {
    const { fields } = await Query.password();
    const decrypted = Query.decryptMany(null, { value: fields.map(d => d.value) });

    expect(decrypted).toEqual(mockPassword.fields.map(d => d.value));
  });

  test('should be able to edit a password', async () => {
    const { _id } = await Query.password();
    const editedPassword = await Mutation.editPassword(null, { _id, icon: 'fa-new' });
    expect(editedPassword.icon).toBe('fa-new');
  });

  test('should be able to delete a password', async () => {
    const { _id } = await Query.password();
    await Mutation.deletePassword(null, { _id });

    const deletedPassword = await Query.password(null, { _id });
    expect(deletedPassword).toBeNull();
  });
});
