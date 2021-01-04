"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertiesType = exports.DateInputType = exports.SummaryType = exports.CasesSublabelType = exports.CasesSubValuesType = exports.CasesType = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _graphqlIsoDate = require("graphql-iso-date");

var _graphql = require("graphql");

var _utils = require("./../../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SubValuesType = new _graphql.GraphQLObjectType({
  name: 'SubValues',
  description: 'Base type for subvalues.',
  fields: function fields() {
    return {
      in: {
        type: _graphql.GraphQLInt,
        description: 'Value increased on date.'
      },
      out: {
        type: _graphql.GraphQLInt,
        description: 'Value decreased on date.'
      },
      deceased: {
        type: _graphql.GraphQLInt,
        description: 'Number of the deaths on date.'
      },
      positive: {
        type: _graphql.GraphQLInt,
        description: 'Number of positive tests on date.'
      },
      percent: {
        type: _graphql.GraphQLFloat,
        description: 'Percent of all tests on date.'
      }
    };
  },
  resolve: function resolve(root) {
    return _objectSpread({}, root.subValues);
  }
});
var CasesType = new _graphql.GraphQLInterfaceType({
  name: 'Cases',
  description: 'Represents shared fields.',
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: 'Property name.'
      },
      date: {
        type: (0, _graphql.GraphQLNonNull)(_graphqlIsoDate.GraphQLDateTime),
        description: 'Represents the date on which data was collected.'
      },
      value: {
        type: _graphql.GraphQLFloat,
        description: 'Number od cases for specific summary property. For 6 properties is integer and for 1 (average) is float.'
      },
      diffPercentage: {
        type: _graphql.GraphQLFloat,
        description: 'Represents difference in percent comparing to the day before.'
      }
    };
  },
  resolveType: function resolveType(shared, _, __) {
    if (shared.sublabel) {
      return CasesSublabelType;
    }

    return CasesSubValuesType;
  }
});
exports.CasesType = CasesType;
var sharedFields = {
  name: {
    type: _graphql.GraphQLString,
    description: 'Property name.'
  },
  value: {
    type: _graphql.GraphQLFloat,
    description: 'Number od cases for specific summary property. For 6 properties is integer and for 1 (average) is float.'
  },
  diffPercentage: {
    type: _graphql.GraphQLFloat,
    description: 'Represents difference in percent comparing to the day before.'
  },
  date: {
    type: (0, _graphql.GraphQLNonNull)(_graphqlIsoDate.GraphQLDateTime),
    description: 'Represents the date on which data was collected.',
    resolve: function resolve(root, _, __, info) {
      var variableValues = info.variableValues;
      var date = root.date;
      var isDate = (0, _utils.isDateValid)(date);

      if (isDate) {
        return date;
      }

      var _ref = root || variableValues,
          year = _ref.year,
          month = _ref.month,
          day = _ref.day;

      isDate = (0, _utils.isDateValid)("".concat(year, "/").concat(month, "/").concat(day));
      date = new Date(Date.UTC(year, month - 1, day));

      if (isDate) {
        return date;
      }

      return null;
    }
  }
};
var CasesSubValuesType = new _graphql.GraphQLObjectType({
  name: 'CasesSubValues',
  description: 'Data for 6 summary properties. Includes <<subValues>>',
  fields: function fields() {
    return _objectSpread(_objectSpread({}, sharedFields), {}, {
      subValues: {
        type: SubValuesType,
        resolve: function resolve(rootValue, _, __, info) {
          info.cacheControl.setCacheHint({
            maxAge: 60,
            scope: 'PRIVATE'
          });
          return rootValue[info.fieldName];
        }
      }
    });
  },
  interfaces: [CasesType]
});
exports.CasesSubValuesType = CasesSubValuesType;
var CasesSublabelType = new _graphql.GraphQLObjectType({
  name: 'CasesSublabel',
  description: 'Data for specific summary property. Includes <<sublabel>> field.',
  fields: function fields() {
    return _objectSpread(_objectSpread({}, sharedFields), {}, {
      sublabel: {
        type: _graphql.GraphQLBoolean,
        description: 'Have no idea at the moment'
      }
    });
  },
  interfaces: [CasesType]
});
exports.CasesSublabelType = CasesSublabelType;

var cacheResolver = function cacheResolver() {
  var fieldName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return function (rootValue, _, __, info) {
    info.cacheControl.setCacheHint({
      maxAge: 60,
      scope: 'PRIVATE'
    });

    if (fieldName) {
      return rootValue[info.fieldName];
    }

    return rootValue;
  };
};

var SummaryType = new _graphql.GraphQLObjectType({
  name: 'Summary',
  description: 'Includes all data received from path /summary',
  fields: function fields() {
    return {
      date: {
        type: (0, _graphql.GraphQLNonNull)(_graphqlIsoDate.GraphQLDateTime),
        description: 'Represents date on which was data collected.'
      },
      casesToDateSummary: {
        type: CasesSubValuesType,
        description: 'Represents absolute number of covid positive.',
        resolve: cacheResolver()
      },
      casesActive: {
        type: CasesSubValuesType,
        description: 'Represents number of active positive.',
        resolve: cacheResolver()
      },
      casesAvg7Days: {
        type: CasesSublabelType,
        description: 'Represents 7 days average of new positive.',
        resolve: cacheResolver()
      },
      hospitalizedCurrent: {
        type: CasesSubValuesType,
        description: 'Represents number of hospitalized positive.',
        resolve: cacheResolver()
      },
      icuCurrent: {
        type: CasesSubValuesType,
        description: 'Represents number of positive in intensive care unit.',
        resolve: cacheResolver()
      },
      deceasedToDate: {
        type: CasesSubValuesType,
        description: 'Represents number of deceased.',
        resolve: cacheResolver()
      },
      testsToday: {
        type: CasesSubValuesType,
        description: 'Represents number of made PCR tests.',
        resolve: cacheResolver()
      },
      testsTodayHAT: {
        type: CasesSubValuesType,
        description: 'Represents number of made HAT tests.',
        resolve: cacheResolver()
      }
    };
  }
});
exports.SummaryType = SummaryType;
var DateInputType = new _graphql.GraphQLInputObjectType({
  name: 'DateInput',
  description: 'Represents the date when data was collected.',
  fields: function fields() {
    return {
      year: {
        type: _graphql.GraphQLInt,
        description: 'Year, Integer',
        defaultValue: new Date().getFullYear()
      },
      month: {
        type: _graphql.GraphQLInt,
        description: 'Month, format M',
        defaultValue: new Date().getMonth() + 1
      },
      day: {
        type: _graphql.GraphQLInt,
        description: 'Day, format D',
        defaultValue: new Date().getDate()
      }
    };
  }
});
exports.DateInputType = DateInputType;
var PropertiesType = new _graphql.GraphQLEnumType({
  name: 'Properties',
  description: 'Possible property names (keys) received from api path. ',
  values: {
    casesToDateSummary: {
      value: 'casesToDateSummary',
      type: _graphql.GraphQLString
    },
    casesActive: {
      value: 'casesActive',
      type: _graphql.GraphQLString
    },
    casesAvg7Days: {
      value: 'casesAvg7Days',
      type: _graphql.GraphQLString
    },
    hospitalizedCurrent: {
      value: 'hospitalizedCurrent',
      type: _graphql.GraphQLString
    },
    icuCurrent: {
      value: 'icuCurrent',
      type: _graphql.GraphQLString
    },
    deceasedToDate: {
      value: 'deceasedToDate',
      type: _graphql.GraphQLString
    },
    testsToday: {
      value: 'testsToday',
      type: _graphql.GraphQLString
    }
  }
});
exports.PropertiesType = PropertiesType;