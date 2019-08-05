"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = lerna;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../../../../utils");

var _path = _interopRequireDefault(require("path"));

function lerna(_x) {
  return _lerna.apply(this, arguments);
}

function _lerna() {
  _lerna = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var babelOptions, buildOptions, projectPath, babelArgs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            babelOptions = args.babelOptions, buildOptions = args.buildOptions;
            projectPath = _path["default"].resolve(process.cwd());
            babelArgs = [];
            console.log('options', args);
            babelArgs.push('src');
            babelArgs.push('--out-dir dist/esm');
            babelArgs.push('--ignore src/**/*.d.ts');
            babelArgs.push('--delete-dir-on-start');
            babelArgs.push("--extensions '.ts,.tsx,.js,.jsx'");

            if (babelOptions.configFile) {
              babelArgs.push('--config-file');
              babelArgs.push(babelOptions.configFile);
            }

            _context.prev = 10;
            _context.next = 13;
            return (0, _utils.executeCommand)("yarn babel", babelArgs, projectPath);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](10);
            console.error(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 15]]);
  }));
  return _lerna.apply(this, arguments);
}