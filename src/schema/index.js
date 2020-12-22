import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { summaryQueries } from './query';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({ ...summaryQueries }),
});

// schema
export const graphqlSchema = new GraphQLSchema({
  query: RootQueryType,
});
