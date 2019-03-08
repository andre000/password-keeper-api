const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mergeTypes } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');

const { schema: userSchema, resolver: userResolver } = require('../components/User');
const { schema: passwordSchema, resolver: passwordResolver } = require('../components/Password');

const resolvers = {
  ...userResolver,
  ...passwordResolver,
};

const typeDefs = mergeTypes([
  userSchema,
  passwordSchema,
], { all: true });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = (app) => {
  app.use('/gql',
    cors(),
    bodyParser.json(),
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV !== 'production',
      formatError: (e) => {
        if (e.code) {
          const statusCode = e.code || '500';
          const { message } = e;
          return { message, statusCode };
        }
        return e;
      },
    }));
};
