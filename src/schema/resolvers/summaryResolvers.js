import { getDateString, getToday, isDateValid, fetchApi } from '../../utils';
import { SUMMARY_URL, TO_DATE_PARAM } from './fetchConstants';

async function fetchSummaryResolver(_root, args, context, info) {
  const { year, month, day } = args.date ? args.date : {};
  const argsUTCValues = [year, month - 1, day];
  const argsDateString = getDateString({ year, month, day });

  const today = getToday();
  const todayUTCValues = [today.year, today.month - 1, today.day];
  const todayDateString = getDateString(today);

  const isArgsDateValid = isDateValid(argsDateString);

  const paramDateString = isArgsDateValid ? argsDateString : todayDateString;

  const date = isArgsDateValid
    ? new Date(Date.UTC(...argsUTCValues))
    : new Date(Date.UTC(...todayUTCValues));

  const url = `${SUMMARY_URL}?${TO_DATE_PARAM}=${paramDateString}`;

  const json = await fetchApi(url);

  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });

  return {
    date,
    ...json,
  };
}

export default { fetchSummaryResolver };
