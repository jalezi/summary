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
  const { year, month, day } = args.date ? args.date : {};
  const argsUTCValues = [year, month - 1, day];
  const argsDateString = getDateString({ year, month, day });

  const today = getToday();
  const todayUTCValues = [today.year, today.month - 1, today.day];
  const todayDateString = getDateString(today);

  const isArgsDateValid = isDateValid(argsDateString);

  console.log(isArgsDateValid);

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
