"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traceResolver = exports.debug = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _graphql = require("graphql");

var _util = _interopRequireDefault(require("util"));

var debug = function debug(obj) {
  // eslint-disable-next-line
  console.log(_util.default.inspect(obj, false, null, true));
}; // based on apollo-tracing
// https://github.com/apollographql/apollo-server/blob/master/packages/apollo-tracing/src/index.ts
// Converts an hrtime array (as returned from process.hrtime) to nanoseconds.
//
// ONLY CALL THIS ON VALUES REPRESENTING DELTAS, NOT ON THE RAW RETURN VALUE
// FROM process.hrtime() WITH NO ARGUMENTS.
//
// The entire point of the hrtime data structure is that the JavaScript Number
// type can't represent all int64 values without loss of precision:
// Number.MAX_SAFE_INTEGER nanoseconds is about 104 days. Calling this function
// on a duration that represents a value less than 104 days is fine. Calling
// this function on an absolute time (which is generally roughly time since
// system boot) is not a good idea.


exports.debug = debug;

var durationHrTimeToNanos = function durationHrTimeToNanos(hrtime) {
  return hrtime[0] * 1e9 + hrtime[1];
};

var formatTracing = function formatTracing(_ref) {
  var startWallTime = _ref.startWallTime,
      endWallTime = _ref.endWallTime,
      duration = _ref.duration,
      resolverCalls = _ref.resolverCalls;
  return {
    version: 1,
    startTime: startWallTime.toISOString(),
    endTime: endWallTime.toISOString(),
    duration: durationHrTimeToNanos(duration),
    execution: {
      resolvers: resolverCalls.map(function (resolverCall) {
        var startOffset = durationHrTimeToNanos(resolverCall.startOffset);
        var durationNano = resolverCall.endOffset ? durationHrTimeToNanos(resolverCall.endOffset) - startOffset : 0;
        return {
          path: (0, _toConsumableArray2.default)((0, _graphql.responsePathAsArray)(resolverCall.path)),
          parentType: resolverCall.parentType.toString(),
          fieldName: resolverCall.fieldName,
          returnType: resolverCall.returnType.toString(),
          startOffset: startOffset,
          duration: durationNano,
          durationMilli: durationNano / 1e6,
          durationSeconds: durationNano / 1e9
        };
      })
    }
  };
};

var traceResolver = function traceResolver(resolver) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(source, args, context, info) {
      var startWallTime, startHrTime, duration, endWallTime, resolverCall, result;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // requestDidStart
              startWallTime = new Date();
              startHrTime = process.hrtime(); // executionDidStart

              duration = process.hrtime(startHrTime);
              endWallTime = new Date();
              resolverCall = {
                path: info.path,
                fieldName: info.fieldName,
                parentType: info.parentType,
                returnType: info.returnType,
                startOffset: process.hrtime(startHrTime)
              }; // willResolveField

              _context.next = 7;
              return resolver(source, args, context, info);

            case 7:
              result = _context.sent;
              resolverCall.endOffset = process.hrtime(startHrTime);
              debug(formatTracing({
                startWallTime: startWallTime,
                endWallTime: endWallTime,
                duration: duration,
                resolverCalls: [resolverCall]
              }));
              return _context.abrupt("return", result);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.traceResolver = traceResolver;