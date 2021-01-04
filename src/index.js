import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlSchema } from './schema';

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';

const app = express();

const server = new ApolloServer({
  schema: graphqlSchema,
  context: async () => {
    return { startTime: new Date() };
  },
  tracing: true,
  cacheControl: true,
  playground: true,
  introspection: true,
  formatResponse(res, req) {
    const { context } = req;
    const { startTime } = context;
    const endTime = new Date();
    const duration = endTime - startTime;
    return {
      ...res,
      extensions: {
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

app.listen({ port: process.env.PORT || 4000 }, () => {
  isDev &&
    console.log(
      `🚀  GraphQL Server ready at http://localhost:4000${server.graphqlPath}`
    );
});
