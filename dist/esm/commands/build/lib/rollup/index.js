"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = runRollup;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mergeOptions2 = _interopRequireDefault(require("./utils/mergeOptions"));

var rollup = _interopRequireWildcard(require("rollup"));

function runRollup(_x) {
  return _runRollup.apply(this, arguments);
}

function _runRollup() {
  _runRollup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref) {
    var options, rollupConfigs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, config, _mergeOptions, inputOptions, outputOptions, optionError;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _ref.options, rollupConfigs = _ref.rollupConfigs;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = rollupConfigs[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 15;
              break;
            }

            config = _step.value;
            console.log("config:", config);
            _mergeOptions = (0, _mergeOptions2["default"])({
              config: config,
              command: {
                config: true,
                c: true
              }
            }), inputOptions = _mergeOptions.inputOptions, outputOptions = _mergeOptions.outputOptions, optionError = _mergeOptions.optionError;
            if (optionError) inputOptions.onwarn({
              code: "UNKNOWN_OPTION",
              message: optionError
            });
            return _context.abrupt("return", build(inputOptions, outputOptions));

          case 12:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 17, 21, 29], [22,, 24, 28]]);
  }));
  return _runRollup.apply(this, arguments);
}

function build(_x2, _x3) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(inputOptions, outputOptions) {
    var bundle, outputOption, _ref2, output;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return rollup.rollup(inputOptions);

          case 2:
            bundle = _context2.sent;
            outputOption = outputOptions[0];
            _context2.next = 6;
            return bundle.generate(outputOption);

          case 6:
            _ref2 = _context2.sent;
            output = _ref2.output;
            _context2.next = 10;
            return Promise.all(outputOptions.map(function (output) {
              return bundle.write(output);
            }));

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _build.apply(this, arguments);
}