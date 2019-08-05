"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var base = _interopRequireWildcard(require("./rollup.base.config"));

var inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig());
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig());
  inputs.push(base.browserConfig(true));
}

var _default = inputs;
exports["default"] = _default;