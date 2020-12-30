import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

export const DateInputType = new GraphQLInputObjectType({
  name: 'DateInput',
  description: 'Represents the date when data was collected.',
  fields: () => ({
    year: {
      type: GraphQLInt,
      description: 'Year, Integer',
      defaultValue: new Date().getFullYear(),
    },
    month: {
      type: GraphQLInt,
      description: 'Month, format M',
      defaultValue: new Date().getMonth() + 1,
    },
    day: {
      type: GraphQLInt,
      description: 'Day, format D',
      defaultValue: new Date().getDate(),
    },
  }),
});
