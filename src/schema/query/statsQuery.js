import { GraphQLList } from 'graphql';

import { DateInputType, OnDateStatsType, StatsFromToType } from '../types';
import { StatsResolvers } from '../resolvers';
import { getYesterday, getToday } from '../../utils';

const { fetchStatsResolver } = StatsResolvers;

export const statsQueries = {
  FromToStats: {
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
    resolve: async (_root, _args, _context, info) => {
      info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
      const res = await fetchStatsResolver(_root, _args, _context, info);
      return res;
    },
  },
  FromToStatsExtra: {
    type: StatsFromToType,
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
    resolve: async (root, args, _context, info) => {
      info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });

      args.from = args.from ? args.from : getYesterday();
      args.to = args.to ? args.to : getToday();

      const res = await fetchStatsResolver(root, args, _context, info);

      const { year: f_year, month: f_month, day: f_day } = args.from;
      const { year: t_year, month: t_month, day: t_day } = args.to;

      const from = new Date(Date.UTC(f_year, f_month - 1, f_day));
      const to = new Date(Date.UTC(t_year, t_month - 1, t_day));
      const datesSpan = (to - from) / (24 * 60 * 60 * 1000) + 1;
      const dataLength = res.length;
      const data = [...res];
      return { from, to, datesSpan, dataLength, data };
    },
  },
};
