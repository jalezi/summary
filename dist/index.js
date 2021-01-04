"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./schema");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_dotenv.default.config();

var app = (0, _express.default)();
var server = new _apolloServerExpress.ApolloServer({
  schema: _schema.graphqlSchema,
  context: function () {
    var _context = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", {
                startTime: new Date()
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    function context() {
      return _context.apply(this, arguments);
    }

    return context;
  }(),
  tracing: true,
  cacheControl: true,
  formatResponse: function formatResponse(res, req) {
    var context = req.context;
    var startTime = context.startTime;
    var endTime = new Date();
    var duration = endTime - startTime;
    return _objectSpread(_objectSpread({}, res), {}, {
      extensions: {
        runTime: {
          startTime: startTime,
          endTime: endTime,
          duration: duration
        }
      }
    });
  }
});
server.applyMiddleware({
  app: app
});
app.listen({
  port: 4000
}, function () {
  console.log("\uD83D\uDE80  GraphQL Server ready at http://localhost:4000".concat(server.graphqlPath));
});