import { fetchSummaryResolver } from '../../utils';
import {
  DateInputType,
  SummaryType,
  SharedInterface,
  PropertiesType,
} from '../types';
// import { traceResolver } from '../../traceResolver';

export const summaryQueries = {
  Summary: {
    type: SummaryType,
    description: 'Some description.',
    args: {
      date: { type: DateInputType },
    },
    resolve: fetchSummaryResolver,
  },
  Shared: {
    type: SharedInterface,
    args: {
      date: { type: DateInputType, description: 'Some Description' },
      property: { type: PropertiesType, defaultValue: 'casesToDateSummary' },
    },
    resolve: async (root, args, context, info) => {
      const res = await fetchSummaryResolver(root, args, context, info);
      return { date: res.date, ...res[args.property] };
    },
  },
};
