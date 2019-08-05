"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register_version = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lerna = _interopRequireDefault(require("./lib/lerna"));

var _standalone = _interopRequireDefault(require("./lib/standalone"));

var register_version = function register_version(program) {
  program.command("bump").description("更新版本以及生成changelog").option('--type [value]', "项目类型 fixed|independent|standalone").option('--changelog [value]', '是否生成changelog ').action(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(cmd) {
      var opts, type;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              opts = cmd.opts();
              type = opts.type;

              if (!(type === 'independent' || type === 'fixed')) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return (0, _lerna["default"])({
                versionOptions: {},
                lernaOptions: {}
              });

            case 5:
              _context.next = 10;
              break;

            case 7:
              if (!(type === 'standalone')) {
                _context.next = 10;
                break;
              }

              _context.next = 10;
              return (0, _standalone["default"])({
                versionOptions: {},
                standaloneOptions: {}
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.register_version = register_version;