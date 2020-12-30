import { GraphQLList } from 'graphql';

import { DateInputType, OnDateStatsType } from '../types';
import { StatsResolvers } from '../resolvers';

const { fetchStatsResolver } = StatsResolvers;

export const statsQueries = {
  onDateStats: {
    type: GraphQLList(OnDateStatsType),
    args: {
      from: {
        type: DateInputType,
        description:
          'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25',
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
