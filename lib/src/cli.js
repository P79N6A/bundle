"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var package_json_1 = require("../package.json");
console.log('version:', package_json_1.version);
commander_1.default.version('0.0.1')
    .description('Facke package manager')
    .command('install [name]', 'install on or more packages')
    .command('search [query]', 'search with optional query')
    .parse(process.argv);
