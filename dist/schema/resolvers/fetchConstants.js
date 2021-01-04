"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SUMMARY_URL = exports.STATS_URL = exports.TO_DATE_PARAM = exports.TO_PARAM = exports.FROM_PARAM = exports.SUMMARY_PATH = exports.STATS_PATH = exports.BASE_URL = void 0;
var BASE_URL = 'https://api.sledilnik.org/api';
exports.BASE_URL = BASE_URL;
var STATS_PATH = 'Stats';
exports.STATS_PATH = STATS_PATH;
var SUMMARY_PATH = 'summary';
exports.SUMMARY_PATH = SUMMARY_PATH;
var FROM_PARAM = 'from';
exports.FROM_PARAM = FROM_PARAM;
var TO_PARAM = 'to';
exports.TO_PARAM = TO_PARAM;
var TO_DATE_PARAM = 'toDate';
exports.TO_DATE_PARAM = TO_DATE_PARAM;
var STATS_URL = "".concat(BASE_URL, "/").concat(STATS_PATH);
exports.STATS_URL = STATS_URL;
var SUMMARY_URL = "".concat(BASE_URL, "/").concat(SUMMARY_PATH);
exports.SUMMARY_URL = SUMMARY_URL;
var _default = {
  BASE_URL: BASE_URL,
  STATS_URL: STATS_URL,
  SUMMARY_URL: SUMMARY_URL,
  STATS_PATH: STATS_PATH,
  SUMMARY_PATH: SUMMARY_PATH,
  FROM_PARAM: FROM_PARAM,
  TO_PARAM: TO_PARAM,
  TO_DATE_PARAM: TO_DATE_PARAM
};
exports.default = _default;