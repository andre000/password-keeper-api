jest.mock('fs');
const fs = require('fs');

fs.readFileSync.mockImplementation(() => `
LOG_LEVEL=debug
PORT=3000
NODE_ENV=development

DB_URI=mongodb://root:root@localhost:27017/password-keeper?authSource=admin

SECRET_KEY=
SECRET_JWT=
GQL_ENDPOINT=/gql
`);

let env;
fs.writeFileSync.mockImplementation((file, value) => { env = value; });

const defaultLog = global.console.log;
global.console.log = jest.fn();
require('./generateKey');

global.console.log = defaultLog;

describe('Generate Key Utility', () => {
  test('should return the .env file with the generated keys', () => {
    expect(env).toMatch(/SECRET_KEY=[0-9a-f]{32}/);
    expect(env).toMatch(/SECRET_JWT=.{40,}/);
  });
});
