"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateString = exports.getYesterday = exports.getToday = exports.writeSchemaToFile = exports.fetchApi = exports.isDateValid = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _graphql = require("graphql");

var isDateValid = function isDateValid() {
  for (var _len = arguments.length, val = new Array(_len), _key = 0; _key < _len; _key++) {
    val[_key] = arguments[_key];
  }

  return !Number.isNaN((0, _construct2.default)(Date, val).valueOf());
};

exports.isDateValid = isDateValid;

var fetchApi = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
    var res, json;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _nodeFetch.default)(url);

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            json = _context.sent;
            return _context.abrupt("return", json);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchApi(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchApi = fetchApi;

var writeSchemaToFile = function writeSchemaToFile(graphqlSchema) {
  if (!graphqlSchema) {
    return new Error('No graphql schema provided!');
  }

  var isGraphQLSchema = graphqlSchema instanceof _graphql.GraphQLSchema;

  if (!isGraphQLSchema) {
    return new Error('Provided argument is not instanceof GraphQLSchema!');
  }

  var schema = (0, _graphql.printSchema)(graphqlSchema);
  var introspectionSchema = (0, _graphql.printIntrospectionSchema)(graphqlSchema);

  var cb = function cb(err) {
    if (err) {
      console.error('Error writing schema', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  };

  fs.writeFileSync('./schema.graphql', schema, cb);
  fs.writeFile('./introspection-schema.graphql', introspectionSchema, cb);
};

exports.writeSchemaToFile = writeSchemaToFile;

var createDateObj = function createDateObj(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return {
    year: year,
    month: month,
    day: day
  };
};

var getToday = function getToday() {
  var date = new Date();
  return createDateObj(date);
};

exports.getToday = getToday;

var getYesterday = function getYesterday() {
  var now = Date.now();
  var yesterday = now - 24 * 60 * 60 * 1000;
  var date = new Date(yesterday);
  return createDateObj(date);
};

exports.getYesterday = getYesterday;

var getDateString = function getDateString(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day;
  return "".concat(year, "/").concat(month, "/").concat(day);
};

exports.getDateString = getDateString;