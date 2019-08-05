"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = lerna;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../../../utils");

var _path = _interopRequireDefault(require("path"));

function lerna(_x) {
  return _lerna.apply(this, arguments);
}

function _lerna() {
  _lerna = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var projectPath, lernaArgs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            projectPath = _path["default"].resolve(process.cwd());
            lernaArgs = [];
            lernaArgs.push('version');
            lernaArgs.push("--conventional-commits");
            _context.prev = 4;
            _context.next = 7;
            return (0, _utils.executeCommand)("lerna", lernaArgs, projectPath);

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);
            console.error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 9]]);
  }));
  return _lerna.apply(this, arguments);
}