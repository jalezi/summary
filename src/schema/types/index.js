import { GraphQLDateTime } from 'graphql-iso-date';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

import { isDateValid } from './../../utils';

const SubValuesType = new GraphQLObjectType({
  name: 'SubValues',
  description: 'Base type for subvalues.',
  fields: () => ({
    in: {
      type: GraphQLInt,
      description: 'Value increased on date.',
    },
    out: {
      type: GraphQLInt,
      description: 'Value decreased on date.',
    },
    deceased: {
      type: GraphQLInt,
      description: 'Number of the deaths on date.',
    },
    positive: {
      type: GraphQLInt,
      description: 'Number of positive tests',
    },
    percent: {
      type: GraphQLFloat,
      description: 'Have no idea how they calculate percent.',
    },
  }),
  resolve: (root, ...rest) => {
    return { ...root.subValues };
  },
});

export const CasesType = new GraphQLInterfaceType({
  name: 'Cases',
  description: 'Represents shared fields.',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLNonNull(GraphQLDateTime),
      description: 'Some Description',
    },
    value: {
      type: GraphQLFloat,
      description: 'Some Description',
    },
    diffPercentage: {
      type: GraphQLFloat,
      description: 'Some Description',
    },
  }),
  resolveType(shared, _, __) {
    if (shared.sublabel) {
      return CasesSublabelType;
    }
    return CasesSubValuesType;
  },
});

const sharedFields = {
  name: {
    type: GraphQLString,
  },
  value: { type: GraphQLFloat, description: 'Some description' },
  diffPercentage: { type: GraphQLFloat, description: 'Some description' },

  date: {
    type: GraphQLNonNull(GraphQLDateTime),
    description: 'Represents the date on which data was collected.',
    resolve: (root, _, __, info) => {
      const { variableValues } = info;
      let { date } = root;
      let isDate = isDateValid(date);

      if (isDate) {
        return date;
      }

      let { year, month, day } = root || variableValues;
      isDate = isDateValid(`${year}/${month}/${day}`);
      date = new Date(Date.UTC(year, month - 1, day));

      if (isDate) {
        return date;
      }

      return null;
    },
  },
};

export const CasesSubValuesType = new GraphQLObjectType({
  name: 'CasesSubValues',
  description: 'Data for 6 Summary classes',
  fields: () => ({
    ...sharedFields,
    subValues: {
      type: SubValuesType,
      resolve: (rootValue, _, __, info) => {
        info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
        return rootValue[info.fieldName];
      },
    },
  }),
  interfaces: [CasesType],
});

export const CasesSublabelType = new GraphQLObjectType({
  name: 'CasesSublabel',
  description: 'Data for specific Summary class. Includes <<sublabel>> field.',
  fields: () => ({
    ...sharedFields,
    sublabel: {
      type: GraphQLBoolean,
      description: 'Some Description',
    },
  }),
  interfaces: [CasesType],
});

const cacheResolver = (fieldName = true) => (rootValue, _, __, info) => {
  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
  if (fieldName) {
    return rootValue[info.fieldName];
  }
  return rootValue;
};
export const SummaryType = new GraphQLObjectType({
  name: 'Summary',
  description: 'Includes all data received from path /summary',
  fields: () => ({
    date: {
      type: GraphQLNonNull(GraphQLDateTime),
      description: 'Some Description',
    },

    casesToDateSummary: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    casesActive: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    casesAvg7Days: {
      type: CasesSublabelType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    hospitalizedCurrent: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    icuCurrent: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    deceasedToDate: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    testsToday: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
    testsTodayHAT: {
      type: CasesSubValuesType,
      description: 'Some Description',
      resolve: cacheResolver(),
    },
  }),
});

export const DateInputType = new GraphQLInputObjectType({
  name: 'DateInput',
  description: 'Some Description',
  fields: () => ({
    year: {
      type: GraphQLInt,
      description: 'Year, Integer',
      defaultValue: new Date().getFullYear(),
    },
    month: {
      type: GraphQLInt,
      description: 'Month, format M',
      defaultValue: new Date().getMonth() + 1,
    },
    day: {
      type: GraphQLInt,
      description: 'Day, format D',
      defaultValue: new Date().getDate(),
    },
  }),
});

export const PropertiesType = new GraphQLEnumType({
  name: 'Properties',
  description: 'Some Description',
  values: {
    casesToDateSummary: {
      value: 'casesToDateSummary',
      type: GraphQLString,
      description: 'Some Description',
    },
    casesActive: {
      value: 'casesActive',
      type: GraphQLString,
      description: 'Some Description',
    },
    casesAvg7Days: {
      value: 'casesAvg7Days',
      description: 'Some Description',
      type: GraphQLString,
    },
    hospitalizedCurrent: {
      value: 'hospitalizedCurrent',
      description: 'Some Description',
      type: GraphQLString,
    },
    icuCurrent: {
      value: 'icuCurrent',
      description: 'Some Description',
      type: GraphQLString,
    },
    deceasedToDate: {
      value: 'deceasedToDate',
      description: 'Some Description',
      type: GraphQLString,
    },
    testsToday: {
      value: 'testsToday',
      description: 'Some Description',
      type: GraphQLString,
    },
  },
});
