import { GraphQLList } from 'graphql';

import { DateInputType, OnDateStatsType } from '../types';
import { StatsResolvers } from '../resolvers';

const { fetchStatsResolver } = StatsResolvers;

export const statsQueries = {
  onDateStats: {
    type: GraphQLList(OnDateStatsType),
    description: `Returns data from api path stats in range defined with params <from> and <to>. 
    If params are omitted <from> is set for yesterday and <to> is set to today.
    If <to> is smaller than <from>, it will return empty array.`,
    args: {
      from: {
        type: DateInputType,
        description:
          'Represents date. Default value is yesterday. Example: {year: 2020, month: 12, day: 25',
      },
      to: {
        type: DateInputType,
        description:
          'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25',
      },
    },
    resolve: async (...all) => {
      const res = await fetchStatsResolver(...all);
      return res;
    },
  },
};
