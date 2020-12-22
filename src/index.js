import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer, GraphQLExtension } from 'apollo-server-express';
import { graphqlSchema } from './schema';

dotenv.config();

const app = express();

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

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀  GraphQL Server ready at http://localhost:4000${server.graphqlPath}`
  );
});
