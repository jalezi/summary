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
  description: 'Some Description',
  fields: () => ({
    in: {
      type: GraphQLInt,
      description: 'Some Description',
    },
    out: {
      type: GraphQLInt,
      description: 'Some Description',
    },
    deceased: {
      type: GraphQLInt,
      description: 'Some Description',
    },
    positive: {
      type: GraphQLInt,
      description: 'Some Description',
    },
    percent: {
      type: GraphQLFloat,
      description: 'Some Description',
    },
  }),
  resolve: (root, ...rest) => {
    return { ...root.subValues };
  },
});

const SharedInterface = new GraphQLInterfaceType({
  name: 'Shared',
  description: 'Some Description',
  fields: () => ({
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
    subValues: { type: SubValuesType },
  }),
});

const sharedFields = {
  value: { type: GraphQLFloat },
  diffPercentage: { type: GraphQLFloat },
  subValues: { type: SubValuesType },
  date: {
    type: GraphQLNonNull(GraphQLDateTime),
    description: 'Some Description',
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

const CasesType = new GraphQLObjectType({
  name: 'CasesToDate',
  description: 'Some Description',
  fields: () => ({
    ...sharedFields,
  }),
  interfaces: [SharedInterface],
});

const CasesWithSublabelType = new GraphQLObjectType({
  name: 'CasesAvg7Days',
  description: 'Some Description',
  fields: () => ({
    ...sharedFields,
    sublabel: {
      type: GraphQLBoolean,
      description: 'Some Description',
    },
  }),
  interfaces: [SharedInterface],
});

export const SummaryType = new GraphQLObjectType({
  name: 'Summary',
  description: 'Some description',
  fields: () => ({
    date: {
      type: GraphQLNonNull(GraphQLDateTime),
      description: 'Some Description',
    },

    casesToDateSummary: {
      type: CasesType,
      description: 'Some Description',
    },
    casesActive: {
      type: CasesType,
      description: 'Some Description',
    },
    casesAvg7Days: {
      type: CasesWithSublabelType,
      description: 'Some Description',
    },
    hospitalizedCurrent: {
      type: CasesType,
      description: 'Some Description',
    },
    icuCurrent: {
      type: CasesType,
      description: 'Some Description',
    },
    deceasedToDate: {
      type: CasesType,
      description: 'Some Description',
    },
    testsToday: {
      type: CasesType,
      description: 'Some Description',
    },
    message: { type: GraphQLString, description: 'Some Description' },
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
