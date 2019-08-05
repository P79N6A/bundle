"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var process_1 = __importDefault(require("process"));
var pkgPath = path_1.default.join(__dirname, '../package.json');
var pkg = fs_1.default.readFileSync(pkgPath).toString();
var version = JSON.parse(pkg).version;
process_1.default.on('unhandledRejection', function (err) {
    console.error('unhandledRejection:', err);
});
commander_1.default.version(version)
    .description('Facke package manager')
    .command('build', 'build library')
    .command('install [name]', 'install on or more packages')
    .command('search [query]', 'search with optional query')
    .parse(process_1.default.argv);
if (!commander_1.default.args.length)
    commander_1.default.help();
