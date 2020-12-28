import { fetchSummaryResolver, fetchStatsResolver } from '../../utils';
import {
  DateInputType,
  SummaryType,
  CasesType,
  PropertiesType,
} from '../types';
import { OnDateStats } from '../types/stats';
import { GraphQLList } from 'graphql';

export const summaryQueries = {
  Summary: {
    type: SummaryType,
    description: 'Returns all summary data.',
    args: {
      date: { type: DateInputType },
    },
    resolve: fetchSummaryResolver,
  },
  getCases: {
    type: CasesType,
    description: 'Returns specific summary data.',
    args: {
      date: {
        type: DateInputType,
        description:
          'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25',
      },
      property: { type: PropertiesType, defaultValue: 'casesToDateSummary' },
    },
    resolve: async (root, { date, property }, context, info) => {
      const res = await fetchSummaryResolver(
        root,
        { date, property },
        context,
        info
      );
      return { name: property, date: res.date, ...res[property] };
    },
  },
  onDateStats: {
    type: GraphQLList(OnDateStats),
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
