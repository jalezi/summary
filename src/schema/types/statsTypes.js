import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLJSONObject } from 'graphql-type-json';
import cacheResolver from '../resolvers/cacheResolver';

const TestDataValuesType = new GraphQLObjectType({
  name: 'TestDataValues',
  description: 'Represents data for specific property.',
  fields: () => ({
    toDate: {
      type: GraphQLInt,
      description: 'Represents cumulative number to date.',
    },
    today: {
      type: GraphQLInt,
      description: 'Represents number on specific date.',
    },
  }),
});

const TestDataType = new GraphQLObjectType({
  name: 'TestData',
  description: 'Represents number of performed and positive tests.',
  fields: () => ({
    performed: {
      type: TestDataValuesType,
    },
    positive: { type: TestDataValuesType },
  }),
});

const TestsType = new GraphQLObjectType({
  name: 'Tests',
  fields: () => ({
    performed: {
      type: TestDataValuesType,
    },
    positive: { type: TestDataValuesType },
    regular: {
      type: TestDataType,
    },
    nsApr20: {
      type: TestDataType,
    },
  }),
});

const StatsCasesType = new GraphQLObjectType({
  name: 'StatsCases',
  fields: () => ({
    confirmedToday: {
      type: GraphQLInt,
    },
    confirmedToDate: {
      type: GraphQLInt,
    },
    recoveredToDate: {
      type: GraphQLInt,
    },
    closedToDate: {
      type: GraphQLInt,
    },
    active: {
      type: GraphQLInt,
    },
    hs: {
      type: GraphQLJSONObject,
    },
    rh: {
      type: GraphQLJSONObject,
    },
    unclassified: {
      type: GraphQLJSONObject,
    },
  }),
});

const StatePerTreatmentType = new GraphQLObjectType({
  name: 'StatePerTreatment',
  fields: () => ({
    inHospital: {
      type: GraphQLInt,
    },
    inHospitalToDate: {
      type: GraphQLInt,
    },
    inICU: {
      type: GraphQLInt,
    },
    critical: {
      type: GraphQLInt,
    },
    deceasedToDate: {
      type: GraphQLInt,
    },
    deceased: {
      type: GraphQLInt,
    },
    outOfHospitalToDate: {
      type: GraphQLInt,
    },
    outOfHospitalTo: {
      type: GraphQLInt,
    },
    recoveredToDate: {
      type: GraphQLInt,
    },
  }),
});

const StatePerRegionType = new GraphQLObjectType({
  name: 'StatePerRegion',
  fields: () => ({
    nm: {
      type: GraphQLInt,
    },
    kr: {
      type: GraphQLInt,
    },
    ce: {
      type: GraphQLInt,
    },
    sg: {
      type: GraphQLInt,
    },
    unknown: {
      type: GraphQLInt,
    },
    mb: {
      type: GraphQLInt,
    },
    ms: {
      type: GraphQLInt,
    },
    kp: {
      type: GraphQLInt,
    },
    za: {
      type: GraphQLInt,
    },
    po: {
      type: GraphQLInt,
    },
    ng: {
      type: GraphQLInt,
    },
    kk: {
      type: GraphQLInt,
    },
    foreign: {
      type: GraphQLInt,
    },
    lj: {
      type: GraphQLInt,
    },
  }),
});

const PerAgeToDateType = new GraphQLObjectType({
  name: 'PerAgeToDate',
  fields: () => ({
    ageFrom: {
      type: GraphQLInt,
    },
    ageTo: {
      type: GraphQLInt,
    },
    allToDate: {
      type: GraphQLInt,
    },
    femaleToDate: {
      type: GraphQLInt,
    },
    maleToDate: {
      type: GraphQLInt,
    },
  }),
});

const DeceasedPerType = new GraphQLObjectType({
  name: 'DeceasedPerType',
  fields: () => ({
    rhOccupant: { type: GraphQLInt },
    other: { type: GraphQLInt },
  }),
});

export const OnDateStatsType = new GraphQLObjectType({
  name: 'OnDateStats',
  fields: () => ({
    date: {
      type: GraphQLDateTime,
      resolve: root => {
        const { year, month, day } = root;
        return new Date(Date.UTC(year, month - 1, day));
      },
    },
    dayFromStart: {
      type: GraphQLInt,
    },
    year: {
      type: GraphQLInt,
    },
    month: {
      type: GraphQLInt,
    },
    day: {
      type: GraphQLInt,
    },
    phase: { type: GraphQLString },
    performedTestsToDate: {
      type: GraphQLInt,
    },
    performedTests: {
      type: GraphQLInt,
    },
    positiveTestsToDate: {
      type: GraphQLInt,
    },
    positiveTests: {
      type: GraphQLInt,
    },
    tests: {
      type: TestsType,
    },
    femaleToDate: {
      type: GraphQLInt,
    },
    maleToDate: {
      type: GraphQLInt,
    },
    cases: {
      type: StatsCasesType,
      resolve: cacheResolver(),
    },
    statePerTreatment: {
      type: StatePerTreatmentType,
      resolve: cacheResolver(),
    },
    statePerRegion: {
      type: StatePerRegionType,
      resolve: cacheResolver(),
    },
    statePerAgeToDate: {
      type: new GraphQLList(PerAgeToDateType),
      resolve: cacheResolver(),
    },
    deceasedPerAgeToDate: {
      type: new GraphQLList(PerAgeToDateType),
      resolve: cacheResolver(),
    },
    deceasedPerType: { type: DeceasedPerType },
  }),
});

export const StatsFromToType = new GraphQLObjectType({
  name: 'StatsFromTo',
  fields: () => ({
    from: { type: GraphQLDateTime },
    to: { type: GraphQLDateTime },
    datesSpan: { type: GraphQLInt },
    dataLength: { type: GraphQLInt },
    data: {
      type: new GraphQLList(OnDateStatsType),
      resolve: cacheResolver(),
    },
  }),
});
