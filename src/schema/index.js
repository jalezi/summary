import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import queries from './query';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({ ...queries }),
});

// schema
export const graphqlSchema = new GraphQLSchema({
  query: RootQueryType,
});
