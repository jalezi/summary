import { fetchSummaryResolver } from '../../utils';
import {
  DateInputType,
  SummaryType,
  CasesType,
  PropertiesType,
} from '../types';
// import { traceResolver } from '../../traceResolver';

export const summaryQueries = {
  Summary: {
    type: SummaryType,
    description: 'Returns all summary data.',
    args: {
      date: { type: DateInputType },
    },
    resolve: fetchSummaryResolver,
  },
  Shared: {
    type: CasesType,
    args: {
      date: { type: DateInputType, description: 'Some Description' },
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
