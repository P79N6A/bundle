"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  presets: [["@babel/preset-env", {
    useBuiltIns: false,
    modules: false
  }], "@babel/preset-typescript"],
  plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-react-jsx"]
};
exports["default"] = _default;