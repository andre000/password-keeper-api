const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mergeTypes } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');
const { schema: userSchema, resolver: userResolver } = require('../components/User');

const resolvers = { ...userResolver };
const typeDefs = mergeTypes([userSchema], { all: true });

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
      graphiql: true,
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
