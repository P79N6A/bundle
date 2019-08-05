"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = _interopRequireDefault(require("commander"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _process = _interopRequireDefault(require("process"));

var pkgPath = _path["default"].join(__dirname, '../package.json');

var pkg = _fs["default"].readFileSync(pkgPath).toString();

var _JSON$parse = JSON.parse(pkg),
    version = _JSON$parse.version;

_process["default"].on('unhandledRejection', function (err) {
  console.error('unhandledRejection:', err);
});

_commander["default"].version(version).description('Facke package manager').command('build', 'build library').command('install [name]', 'install on or more packages').command('search [query]', 'search with optional query').parse(_process["default"].argv);

if (!_commander["default"].args.length) _commander["default"].help();