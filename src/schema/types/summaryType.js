import { GraphQLDateTime } from 'graphql-iso-date';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInterfaceType,
  GraphQLString,
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
      description: 'Number of positive tests on date.',
    },
    percent: {
      type: GraphQLFloat,
      description: 'Percent of all tests on date.',
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
      description: 'Property name.',
    },
    date: {
      type: GraphQLNonNull(GraphQLDateTime),
      description: 'Represents the date on which data was collected.',
    },
    value: {
      type: GraphQLFloat,
      description:
        'Number od cases for specific summary property. For 6 properties is integer and for 1 (average) is float.',
    },
    diffPercentage: {
      type: GraphQLFloat,
      description:
        'Represents difference in percent comparing to the day before.',
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
    description: 'Property name.',
  },
  value: {
    type: GraphQLFloat,
    description:
      'Number od cases for specific summary property. For 6 properties is integer and for 1 (average) is float.',
  },
  diffPercentage: {
    type: GraphQLFloat,
    description:
      'Represents difference in percent comparing to the day before.',
  },

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
  description: 'Data for 6 summary properties. Includes <<subValues>>',
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
  description:
    'Data for specific summary property. Includes <<sublabel>> field.',
  fields: () => ({
    ...sharedFields,
    sublabel: {
      type: GraphQLBoolean,
      description: 'Have no idea at the moment',
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
      description: 'Represents date on which was data collected.',
    },

    casesToDateSummary: {
      type: CasesSubValuesType,
      description: 'Represents absolute number of covid positive.',
      resolve: cacheResolver(),
    },
    casesActive: {
      type: CasesSubValuesType,
      description: 'Represents number of active positive.',
      resolve: cacheResolver(),
    },
    casesAvg7Days: {
      type: CasesSublabelType,
      description: 'Represents 7 days average of new positive.',
      resolve: cacheResolver(),
    },
    hospitalizedCurrent: {
      type: CasesSubValuesType,
      description: 'Represents number of hospitalized positive.',
      resolve: cacheResolver(),
    },
    icuCurrent: {
      type: CasesSubValuesType,
      description: 'Represents number of positive in intensive care unit.',
      resolve: cacheResolver(),
    },
    deceasedToDate: {
      type: CasesSubValuesType,
      description: 'Represents number of deceased.',
      resolve: cacheResolver(),
    },
    testsToday: {
      type: CasesSubValuesType,
      description: 'Represents number of made PCR tests.',
      resolve: cacheResolver(),
    },
    testsTodayHAT: {
      type: CasesSubValuesType,
      description: 'Represents number of made HAT tests.',
      resolve: cacheResolver(),
    },
  }),
});

export const PropertiesType = new GraphQLEnumType({
  name: 'Properties',
  description: 'Possible property names (keys) received from api path. ',
  values: {
    casesToDateSummary: {
      value: 'casesToDateSummary',
      type: GraphQLString,
    },
    casesActive: {
      value: 'casesActive',
      type: GraphQLString,
    },
    casesAvg7Days: {
      value: 'casesAvg7Days',
      type: GraphQLString,
    },
    hospitalizedCurrent: {
      value: 'hospitalizedCurrent',
      type: GraphQLString,
    },
    icuCurrent: {
      value: 'icuCurrent',
      type: GraphQLString,
    },
    deceasedToDate: {
      value: 'deceasedToDate',
      type: GraphQLString,
    },
    testsToday: {
      value: 'testsToday',
      type: GraphQLString,
    },
  },
});
