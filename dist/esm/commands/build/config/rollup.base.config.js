"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeConfig = nodeConfig;
exports.browserConfig = browserConfig;

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _rollupPluginReplace = _interopRequireDefault(require("rollup-plugin-replace"));

var _rollupPluginJson = _interopRequireDefault(require("rollup-plugin-json"));

var _path = _interopRequireDefault(require("path"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _rollupPluginSourcemaps = _interopRequireDefault(require("rollup-plugin-sourcemaps"));

var _rollupPluginVisualizer = _interopRequireDefault(require("rollup-plugin-visualizer"));

var cwd = process.cwd();

var pkgPath = _path["default"].join(cwd, './package.json');

var pkg = require(pkgPath);

var depNames = Object.keys(pkg.dependencies || {});
var pkgName = pkg.name && pkg.name.replace(/^@.*\//, '');
var input = "dist/esm/index.js";
var production = process.env.NODE_ENV === "production";

function nodeConfig() {
  var externalNodeBuiltins = ["events"];
  var baseConfig = {
    input: input,
    external: depNames.concat(externalNodeBuiltins),
    output: {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [(0, _rollupPluginSourcemaps["default"])(), (0, _rollupPluginReplace["default"])({
      delimiters: ["", ""],
      values: {
        // replace dynamic checks with if (true) since this is for node only.
        // Allows rollup's dead code elimination to be more aggressive.
        "if (isNode)": "if (true)"
      }
    }), (0, _rollupPluginNodeResolve["default"])({
      preferBuiltins: true
    }), (0, _rollupPluginCommonjs["default"])(), (0, _rollupPluginJson["default"])()]
  };

  if (production) {
    baseConfig.plugins.push((0, _rollupPluginTerser.terser)());
  }

  return baseConfig;
}

function browserConfig() {
  var production = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var baseConfig = {
    input: input,
    output: {
      file: "dist/umd/".concat(pkgName),
      format: "umd",
      name: "ExampleClient",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [(0, _rollupPluginSourcemaps["default"])(), (0, _rollupPluginReplace["default"])({
      delimiters: ["", ""],
      values: {
        // replace dynamic checks with if (false) since this is for
        // browser only. Rollup's dead code elimination will remove
        // any code guarded by if (isNode) { ... }
        "if (isNode)": "if (false)"
      }
    }), (0, _rollupPluginNodeResolve["default"])({
      mainFields: ["module", "browser"],
      preferBuiltins: false
    }), (0, _rollupPluginCommonjs["default"])({
      // When "rollup-plugin-commonjs@10.0.0" is used with "resolve@1.11.1", named exports of
      // modules with built-in names must have a trailing slash.
      // https://github.com/rollup/rollup-plugin-commonjs/issues/394
      namedExports: {
        "events/": ["EventEmitter"]
      }
    }), (0, _rollupPluginVisualizer["default"])({
      filename: "dist/umd/browser-stats.html",
      sourcemap: false
    })]
  };

  if (production) {
    baseConfig.output.file = "dist/umd/".concat(pkgName, ".min.js");
    baseConfig.plugins.push((0, _rollupPluginTerser.terser)());
  }

  return baseConfig;
}