"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
commander_1.default.option('-f, --force', 'force installation')
    .parse(process.argv);
var pkgs = commander_1.default.args;
if (!pkgs.length) {
    console.error('packages required');
    process.exit(1);
}
