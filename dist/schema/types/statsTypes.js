"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnDateStats = void 0;

var _graphql = require("graphql");

var _graphqlIsoDate = require("graphql-iso-date");

var _graphqlTypeJson = require("graphql-type-json");

var TestDataValuesType = new _graphql.GraphQLObjectType({
  name: 'TestDataValues',
  description: 'Represents data for specific property.',
  fields: function fields() {
    return {
      toDate: {
        type: _graphql.GraphQLInt,
        description: 'Represents cumulative number to date.'
      },
      today: {
        type: _graphql.GraphQLInt,
        description: 'Represents number on specific date.'
      }
    };
  }
});
var TestDataType = new _graphql.GraphQLObjectType({
  name: 'TestData',
  description: 'Represents number of performed and positive tests.',
  fields: function fields() {
    return {
      performed: {
        type: TestDataValuesType
      },
      positive: {
        type: TestDataValuesType
      }
    };
  }
});
var TestsType = new _graphql.GraphQLObjectType({
  name: 'Tests',
  fields: function fields() {
    return {
      performed: {
        type: TestDataValuesType
      },
      positive: {
        type: TestDataValuesType
      },
      regular: {
        type: TestDataType
      },
      nsApr20: {
        type: TestDataType
      }
    };
  }
});
var StatsCasesType = new _graphql.GraphQLObjectType({
  name: 'StatsCases',
  fields: function fields() {
    return {
      confirmedToday: {
        type: _graphql.GraphQLInt
      },
      confirmedToDate: {
        type: _graphql.GraphQLInt
      },
      recoveredToDate: {
        type: _graphql.GraphQLInt
      },
      closedToDate: {
        type: _graphql.GraphQLInt
      },
      active: {
        type: _graphql.GraphQLInt
      },
      hs: {
        type: _graphqlTypeJson.GraphQLJSONObject
      },
      rh: {
        type: _graphqlTypeJson.GraphQLJSONObject
      },
      unclassified: {
        type: _graphqlTypeJson.GraphQLJSONObject
      }
    };
  }
});
var StatePerTreatmentType = new _graphql.GraphQLObjectType({
  name: 'StatePerTreatment',
  fields: function fields() {
    return {
      inHospital: {
        type: _graphql.GraphQLInt
      },
      inHospitalToDate: {
        type: _graphql.GraphQLInt
      },
      inICU: {
        type: _graphql.GraphQLInt
      },
      critical: {
        type: _graphql.GraphQLInt
      },
      deceasedToDate: {
        type: _graphql.GraphQLInt
      },
      deceased: {
        type: _graphql.GraphQLInt
      },
      outOfHospitalToDate: {
        type: _graphql.GraphQLInt
      },
      outOfHospitalTo: {
        type: _graphql.GraphQLInt
      },
      recoveredToDate: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
var StatePerRegionType = new _graphql.GraphQLObjectType({
  name: 'StatePerRegion',
  fields: function fields() {
    return {
      nm: {
        type: _graphql.GraphQLInt
      },
      kr: {
        type: _graphql.GraphQLInt
      },
      ce: {
        type: _graphql.GraphQLInt
      },
      sg: {
        type: _graphql.GraphQLInt
      },
      unknown: {
        type: _graphql.GraphQLInt
      },
      mb: {
        type: _graphql.GraphQLInt
      },
      ms: {
        type: _graphql.GraphQLInt
      },
      kp: {
        type: _graphql.GraphQLInt
      },
      za: {
        type: _graphql.GraphQLInt
      },
      po: {
        type: _graphql.GraphQLInt
      },
      ng: {
        type: _graphql.GraphQLInt
      },
      kk: {
        type: _graphql.GraphQLInt
      },
      foreign: {
        type: _graphql.GraphQLInt
      },
      lj: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
var PerAgeToDateType = new _graphql.GraphQLObjectType({
  name: 'PerAgeToDate',
  fields: function fields() {
    return {
      ageFrom: {
        type: _graphql.GraphQLInt
      },
      ageTo: {
        type: _graphql.GraphQLInt
      },
      allToDate: {
        type: _graphql.GraphQLInt
      },
      femaleToDate: {
        type: _graphql.GraphQLInt
      },
      maleToDate: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
var DeceasedPerType = new _graphql.GraphQLObjectType({
  name: 'DeceasedPerType',
  fields: function fields() {
    return {
      rhOccupant: {
        type: _graphql.GraphQLInt
      },
      other: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
var OnDateStats = new _graphql.GraphQLObjectType({
  name: 'OnDate',
  fields: function fields() {
    return {
      date: {
        type: _graphqlIsoDate.GraphQLDateTime,
        resolve: function resolve(root) {
          var year = root.year,
              month = root.month,
              day = root.day;
          return new Date(Date.UTC(year, month - 1, day));
        }
      },
      dayFromStart: {
        type: _graphql.GraphQLInt
      },
      year: {
        type: _graphql.GraphQLInt
      },
      month: {
        type: _graphql.GraphQLInt
      },
      day: {
        type: _graphql.GraphQLInt
      },
      phase: {
        type: _graphql.GraphQLString
      },
      performedTestsToDate: {
        type: _graphql.GraphQLInt
      },
      performedTests: {
        type: _graphql.GraphQLInt
      },
      positiveTestsToDate: {
        type: _graphql.GraphQLInt
      },
      positiveTests: {
        type: _graphql.GraphQLInt
      },
      tests: {
        type: TestsType
      },
      femaleToDate: {
        type: _graphql.GraphQLInt
      },
      maleToDate: {
        type: _graphql.GraphQLInt
      },
      cases: {
        type: StatsCasesType
      },
      statePerTreatment: {
        type: StatePerTreatmentType
      },
      statePerRegion: {
        type: StatePerRegionType
      },
      statePerAgeToDate: {
        type: new _graphql.GraphQLList(PerAgeToDateType)
      },
      deceasedPerAgeToDate: {
        type: new _graphql.GraphQLList(PerAgeToDateType)
      },
      deceasedPerType: {
        type: DeceasedPerType
      }
    };
  }
});
exports.OnDateStats = OnDateStats;