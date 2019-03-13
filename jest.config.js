module.exports = {
  globalSetup: './src/tests/setup.js',
  globalTeardown: './src/tests/teardown.js',
  testEnvironment: './src/tests/environment.js',
  collectCoverageFrom: [
    '**/bin/**/*.js',
    '**/src/**/*.js',
    '!**/index.js',
    '!**/logger.js',
    '!**/errors.js',
    '!**/connection.js',
    '!**/*spec.js',
    '!**/schema.js',
    '!**/src/tests/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
