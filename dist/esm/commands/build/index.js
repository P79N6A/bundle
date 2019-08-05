"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _babel = _interopRequireDefault(require("./lib/babel"));

var _tsc = _interopRequireDefault(require("./lib/tsc"));

var _tsconfig = _interopRequireDefault(require("./config/tsconfig.json"));

var _commander = _interopRequireDefault(require("commander"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_commander["default"].description("公共库编译").option("--copy-files [value]", "拷贝不能编译的文件内容（如.md等文件)", true).option("--source-maps [true|false]", "是否开启sourcemap", booleanify).option("--entry [value]", "入口entry").option("--outDir [value]", "编译产物目录").option("-x, --extensions [extensions]", "需要编译的文件后缀，默认为[.es6,.js,.es,.jsx,.mjs]").action(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(cmd) {
    var opts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = cmd.opts();
            _context.next = 3;
            return (0, _tsc["default"])({
              options: opts,
              tscOptions: _tsconfig["default"]
            });

          case 3:
            _context.next = 5;
            return (0, _babel["default"])({
              buildOptions: _objectSpread({}, opts, {
                outDir: "dist/esm"
              }),
              babelOptions: {
                configFile: _path["default"].join(__dirname, './config/babel.esm.js')
              }
            });

          case 5:
            _context.next = 7;
            return (0, _babel["default"])({
              buildOptions: _objectSpread({}, opts, {
                outDir: 'dist/cjs'
              }),
              babelOptions: {
                configFile: _path["default"].join(__dirname, './config/babel.cjs.js')
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).parse(process.argv);

function booleanify(val) {
  if (val == "true" || val == 1) {
    return true;
  }

  if (val == "false" || val == 0 || !val) {
    return false;
  }

  return val;
}