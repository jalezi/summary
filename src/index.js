import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server';
import { graphqlSchema } from './schema';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: graphqlSchema,
  formatResponse(res, req) {
    const { context } = req;
    return {
      ...res,
      extensions: { context },
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
