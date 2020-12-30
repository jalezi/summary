import {
  DateInputType,
  SummaryType,
  CasesType,
  PropertiesType,
} from '../types';
import { SummaryResolvers } from '../resolvers';

const { fetchSummaryResolver } = SummaryResolvers;

export const summaryQueries = {
  Summary: {
    type: SummaryType,
    description: 'Returns all summary data.',
    args: {
      date: {
        type: DateInputType,
        description:
          'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25',
      },
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
};
