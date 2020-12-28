import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const OnDateStats = new GraphQLObjectType({
  name: 'OnDate',
  fields: () => ({
    dayFromStart: {
      type: GraphQLInt,
    },
    year: {
      type: GraphQLInt,
    },
    month: {
      type: GraphQLInt,
    },
    day: {
      type: GraphQLInt,
    },
    phase: { type: GraphQLString },
    performedTestsToDate: {
      type: GraphQLInt,
    },
    performedTests: {
      type: GraphQLInt,
    },
    positiveTestsToDate: {
      type: GraphQLInt,
    },
    positiveTests: {
      type: GraphQLInt,
    },
  }),
});
