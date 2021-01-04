"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../../utils");

var _fetchConstants = require("./fetchConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fetchSummaryResolver(_x, _x2, _x3, _x4) {
  return _fetchSummaryResolver.apply(this, arguments);
}

function _fetchSummaryResolver() {
  _fetchSummaryResolver = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_root, args, context, info) {
    var _ref, year, month, day, argsUTCValues, argsDateString, today, todayUTCValues, todayDateString, isArgsDateValid, paramDateString, date, url, json;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = args.date ? args.date : {}, year = _ref.year, month = _ref.month, day = _ref.day;
            argsUTCValues = [year, month - 1, day];
            argsDateString = (0, _utils.getDateString)({
              year: year,
              month: month,
              day: day
            });
            today = (0, _utils.getToday)();
            todayUTCValues = [today.year, today.month - 1, today.day];
            todayDateString = (0, _utils.getDateString)(today);
            isArgsDateValid = (0, _utils.isDateValid)(argsDateString);
            paramDateString = isArgsDateValid ? argsDateString : todayDateString;
            date = isArgsDateValid ? new Date(Date.UTC.apply(Date, argsUTCValues)) : new Date(Date.UTC.apply(Date, todayUTCValues));
            url = "".concat(_fetchConstants.SUMMARY_URL, "?").concat(_fetchConstants.TO_DATE_PARAM, "=").concat(paramDateString);
            _context.next = 12;
            return (0, _utils.fetchApi)(url);

          case 12:
            json = _context.sent;
            info.cacheControl.setCacheHint({
              maxAge: 60,
              scope: 'PRIVATE'
            });
            return _context.abrupt("return", _objectSpread({
              date: date
            }, json));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchSummaryResolver.apply(this, arguments);
}

var _default = {
  fetchSummaryResolver: fetchSummaryResolver
};
exports.default = _default;