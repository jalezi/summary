"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fetchConstants = require("./fetchConstants");

var _utils = require("../../utils");

function fetchStatsResolver(_x, _x2, _x3, _x4) {
  return _fetchStatsResolver.apply(this, arguments);
}

function _fetchStatsResolver() {
  _fetchStatsResolver = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, args, __, info) {
    var today, yesterday, from, to, fromAsString, toAsString, url, json;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            today = (0, _utils.getToday)();
            yesterday = (0, _utils.getYesterday)();
            from = args.from, to = args.to;
            fromAsString = from ? (0, _utils.getDateString)(from) : (0, _utils.getDateString)(yesterday);
            toAsString = to ? (0, _utils.getDateString)(to) : (0, _utils.getDateString)(today);
            url = "".concat(_fetchConstants.STATS_URL, "?").concat(_fetchConstants.FROM_PARAM, "=").concat(fromAsString, "&").concat(_fetchConstants.TO_PARAM, "=").concat(toAsString);
            _context.next = 8;
            return (0, _utils.fetchApi)(url);

          case 8:
            json = _context.sent;
            info.cacheControl.setCacheHint({
              maxAge: 60,
              scope: 'PRIVATE'
            });
            return _context.abrupt("return", json);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchStatsResolver.apply(this, arguments);
}

var _default = {
  fetchStatsResolver: fetchStatsResolver
};
exports.default = _default;