import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

export const DateInputType = new GraphQLInputObjectType({
  name: 'DateInput',
  description: 'Represents the date when data was collected.',
  fields: () => ({
    year: {
      type: GraphQLInt,
      description: 'Year, Integer',
    },
    month: {
      type: GraphQLInt,
      description: 'Month, format M',
    },
    day: {
      type: GraphQLInt,
      description: 'Day, format D',
    },
  }),
});
