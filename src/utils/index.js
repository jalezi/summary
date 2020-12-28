import fetch from 'node-fetch';
import { printIntrospectionSchema, printSchema, GraphQLSchema } from 'graphql';

const BASE_URL = 'https://api.sledilnik.org/api';
const STATS_PATH = 'Stats';
const SUMMARY_PATH = 'summary';
const FROM_PARAM = 'from';
const TO_PARAM = 'to';
const TO_DATE_PARAM = 'toDate';
const STATS_URL = `${BASE_URL}/${STATS_PATH}`;
const SUMMARY_URL = `${BASE_URL}/${SUMMARY_PATH}`;

export const isDateValid = (...val) =>
  !Number.isNaN(new Date(...val).valueOf());

const isNotNull = val => val !== null;

const fetchApi = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const fetchSummaryResolver = async (_root, args, context, info) => {
  const { year: _year, month: _month, day: _day } = args.date ? args.date : {};
  const _date = isDateValid(`${_year}/${_month}/${_day}`)
    ? new Date(Date.UTC(_year, _month - 1, _day))
    : null;
  const dateIsNotNull = isNotNull(_date);

  const dateString = dateIsNotNull ? `${_year}/${_month}/${_day}` : null;

  const url = dateIsNotNull
    ? `${SUMMARY_URL}?${TO_DATE_PARAM}=${dateString}`
    : SUMMARY_URL;

  const json = await fetchApi(url);

  const today = new Date();
  const t_year = today.getFullYear();
  const t_month = today.getMonth();
  const t_day = today.getDate();
  const date = _date ? _date : new Date(Date.UTC(t_year, t_month, t_day));

  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });

  return {
    date,
    ...json,
  };
};

export const fetchStatsResolver = async (_, args, __, info) => {
  const today = getToday();
  const yesterday = getYesterday();

  const { from, to } = args;

  const fromAsString = from ? getDateString(from) : getDateString(yesterday);
  const toAsString = to ? getDateString(to) : getDateString(today);

  const url = `${STATS_URL}?${FROM_PARAM}=${fromAsString}&${TO_PARAM}=${toAsString}`;
  const json = await fetchApi(url);

  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
  return json;
};

export const writeSchemaToFile = graphqlSchema => {
  if (!graphqlSchema) {
    return new Error('No graphql schema provided!');
  }

  const isGraphQLSchema = graphqlSchema instanceof GraphQLSchema;

  if (!isGraphQLSchema) {
    return new Error('Provided argument is not instanceof GraphQLSchema!');
  }

  const schema = printSchema(graphqlSchema);
  const introspectionSchema = printIntrospectionSchema(graphqlSchema);

  const cb = err => {
    if (err) {
      console.error('Error writing schema', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  };
  fs.writeFileSync('./schema.graphql', schema, cb);
  fs.writeFile('./introspection-schema.graphql', introspectionSchema, cb);
};

const createDateObj = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
};

export const getToday = () => {
  const date = new Date();
  return createDateObj(date);
};

export const getYesterday = () => {
  const now = Date.now();
  const yesterday = now - 24 * 60 * 60 * 1000;
  const date = new Date(yesterday);
  return createDateObj(date);
};

export const getDateString = ({ year, month, day }) => {
  return `${year}/${month}/${day}`;
};
