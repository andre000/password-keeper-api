const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { mergeTypes } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLScalarType } = require('graphql');

const { schema: userSchema, resolver: userResolver } = require('../components/User');
const { schema: passwordSchema, resolver: passwordResolver } = require('../components/Password');
const { schema: folderSchema, resolver: folderResolver } = require('../components/Folder');

const RawType = new GraphQLScalarType({
  name: 'Raw',
  serialize(value) /* istanbul ignore next */ {
    return value;
  },
});

const resolvers = {
  Query: {
    ...passwordResolver.Query,
    ...userResolver.Query,
    ...folderResolver.Query,
  },
  Mutation: {
    ...passwordResolver.Mutation,
    ...userResolver.Mutation,
    ...folderResolver.Mutation,
  },
  RawType,
};

const typeDefs = mergeTypes([
  passwordSchema,
  userSchema,
  folderSchema,
], { all: true });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = (app) => {
  app.use(process.env.GQL_ENDPOINT,
    cors(),
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV !== 'production',
      formatError: (e) => /* istanbul ignore next */ {
        if (e.code) {
          const statusCode = e.code || '500';
          const { message } = e;
          return { message, statusCode };
        }
        return e;
      },
    }));
};
