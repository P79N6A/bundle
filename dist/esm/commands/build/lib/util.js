"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isComibleExtension = isComibleExtension;
exports.adjustRelative = adjustRelative;
exports.deleteDir = deleteDir;
exports.compile = compile;
exports.readdir = readdir;
exports.addSourceMappingUrl = addSourceMappingUrl;
exports.chmod = chmod;
exports.DEFAULT_EXTENSIONS = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var babel = _interopRequireWildcard(require("@babel/core"));

var _fsReaddirRecursive = _interopRequireDefault(require("fs-readdir-recursive"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CALLER = {
  name: "@babel/cli"
};
var DEFAULT_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
/**
 * 根据后缀名判断是否能编译该文件
 * @param filename
 * @param allExts
 */

exports.DEFAULT_EXTENSIONS = DEFAULT_EXTENSIONS;

function isComibleExtension(filename, allExts) {
  var exts = allExts || DEFAULT_EXTENSIONS;

  var ext = _path["default"].extname(filename);

  return exts.includes(ext);
}
/**
 * 调整文件后缀为.js
 * @param relative
 * @param keepFileExtension
 */


function adjustRelative(relative, keepFileExtension) {
  if (keepFileExtension) {
    return relative;
  }

  return relative.replace(/\.(\w*?)$/, "") + ".js";
}
/**
 *
 */


function deleteDir(pathname) {
  if (_fs["default"].existsSync(pathname)) {
    _fs["default"].readdirSync(pathname).forEach(function (file) {
      var curPath = _path["default"].join(pathname, file);

      if (_fs["default"].lstatSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        _fs["default"].unlinkSync(curPath);
      }
    });

    _fs["default"].rmdirSync(pathname);
  }
}

function compile(filename, babelOptions) {
  babelOptions = _objectSpread({}, babelOptions, {
    caller: CALLER
  });
  return new Promise(function (resolve, reject) {
    babel.transformFile(filename, babelOptions, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function readdir(dirname, includeDotfiles, filter) {
  return (0, _fsReaddirRecursive["default"])(dirname, function (filename, _index, currentDirectory) {
    var stat = _fs["default"].statSync(_path["default"].join(currentDirectory, filename));

    if (stat.isDirectory()) return true;
    return (includeDotfiles || filename[0] !== ".") && (!filter || filter(filename));
  });
}

function addSourceMappingUrl(code, loc) {
  return code + "\n//# sourceMappingURL=" + _path["default"].basename(loc);
}

function chmod(src, dest) {
  _fs["default"].chmodSync(dest, _fs["default"].statSync(src).mode);
}