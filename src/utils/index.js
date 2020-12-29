import fetch from 'node-fetch';
import { printIntrospectionSchema, printSchema, GraphQLSchema } from 'graphql';

export const isDateValid = (...val) =>
  !Number.isNaN(new Date(...val).valueOf());

export const fetchApi = async url => {
  const res = await fetch(url);
  const json = await res.json();
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
