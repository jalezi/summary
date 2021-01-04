"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summaryQueries = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

var _types = require("../types");

var _resolvers = require("../resolvers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fetchSummaryResolver = _resolvers.SummaryResolvers.fetchSummaryResolver;
var fetchStatsResolver = _resolvers.StatsResolvers.fetchStatsResolver;
var summaryQueries = {
  Summary: {
    type: _types.SummaryType,
    description: 'Returns all summary data.',
    args: {
      date: {
        type: _types.DateInputType
      }
    },
    resolve: fetchSummaryResolver
  },
  getCases: {
    type: _types.CasesType,
    description: 'Returns specific summary data.',
    args: {
      date: {
        type: _types.DateInputType,
        description: 'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25'
      },
      property: {
        type: _types.PropertiesType,
        defaultValue: 'casesToDateSummary'
      }
    },
    resolve: function () {
      var _resolve = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(root, _ref, context, info) {
        var date, property, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = _ref.date, property = _ref.property;
                _context.next = 3;
                return fetchSummaryResolver(root, {
                  date: date,
                  property: property
                }, context, info);

              case 3:
                res = _context.sent;
                return _context.abrupt("return", _objectSpread({
                  name: property,
                  date: res.date
                }, res[property]));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function resolve(_x, _x2, _x3, _x4) {
        return _resolve.apply(this, arguments);
      }

      return resolve;
    }()
  },
  onDateStats: {
    type: (0, _graphql.GraphQLList)(_types.OnDateStats),
    args: {
      from: {
        type: _types.DateInputType,
        description: 'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25'
      },
      to: {
        type: _types.DateInputType,
        description: 'Represents date. Default value is today. Example: {year: 2020, month: 12, day: 25'
      }
    },
    resolve: function () {
      var _resolve2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetchStatsResolver.apply(void 0, _args2);

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function resolve() {
        return _resolve2.apply(this, arguments);
      }

      return resolve;
    }()
  }
};
exports.summaryQueries = summaryQueries;