import { STATS_URL, FROM_PARAM, TO_PARAM } from './fetchConstants';
import { getToday, getYesterday, fetchApi, getDateString } from '../../utils';

async function fetchStatsResolver(_, args, __, info) {
  const today = getToday();
  const yesterday = getYesterday();

  const { from, to } = args;

  const fromAsString = from ? getDateString(from) : getDateString(yesterday);
  const toAsString = to ? getDateString(to) : getDateString(today);

  const url = `${STATS_URL}?${FROM_PARAM}=${fromAsString}&${TO_PARAM}=${toAsString}`;
  const json = await fetchApi(url);

  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
  return json;
}

export default { fetchStatsResolver };
