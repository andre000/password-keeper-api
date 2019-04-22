/* eslint-disable no-underscore-dangle */
const testDB = require('../../tests/connection');
const Password = require('../Password/model');
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
};

const mockFolder = {
  title: 'Test Folder',
  color: '#aaa',
};

describe('Folder Resolver', () => {
  test('should be able to save a folder', async () => {
    const folder = await Mutation.addFolder(null, mockFolder);
    expect(folder.title).toBe(mockFolder.title);
  });

  test('should be able to retrive a folder', async () => {
    const { title } = await Query.folder(null, { title: mockFolder.title });
    expect(title).toBe(mockFolder.title);
  });

  test('should be able to retrive multiple folders', async () => {
    const folders = await Query.folders();
    expect(Array.isArray(folders)).toBe(true);

    const foldersWithParams = await Query.folders(null, { title: mockFolder.title });
    expect(Array.isArray(foldersWithParams)).toBe(true);
  });

  test('should be able to edit a folder', async () => {
    const { _id } = await Query.folder({ title: mockFolder.title });
    const password = await new Password(mockPassword).save();

    const folder = await Mutation.editFolder(null, { _id, passwords: [password._id] });
    expect(folder.passwords[0].title).toBe(mockPassword.title);
  });

  test('should be able to validate an hexadecimal color', async () => {
    const { _id } = await Query.folder({ title: mockFolder.title });
    expect(Mutation.editFolder(null, { _id, color: 'blue' })).rejects.toThrow('Validation failed: color: blue is not a valid hexadecimal color!');
  });

  test('should be able to delete an folder', async () => {
    const { _id } = await Query.folder({ title: mockFolder.title });
    await Mutation.deleteFolder(null, { _id });
    const deletedFolder = await Query.folder(null, { _id });
    expect(!!deletedFolder).toBe(false);
  });
});
