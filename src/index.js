import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer, GraphQLExtension } from 'apollo-server-express';
import { graphqlSchema } from './schema';

dotenv.config();

const app = express();

const server = new ApolloServer({
  schema: graphqlSchema,
  context: async ({ req }) => {
    return { startTime: new Date() };
  },
  tracing: true,
  cacheControl: true,
  formatResponse(res, req) {
    const { context, extensions } = req;
    const { startTime } = context;
    const endTime = new Date();
    const duration = endTime - startTime;
    return {
      ...res,
      extensions: {
        ...extensions,
        runTime: {
          startTime,
          endTime,
          duration,
        },
      },
    };
  },
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀  GraphQL Server ready at http://localhost:4000${server.graphqlPath}`
  );
});
