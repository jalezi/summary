import { fetchSummaryResolver } from '../../utils';
import { DateInputType } from '../types';
import { SummaryType } from '../types';
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
};
