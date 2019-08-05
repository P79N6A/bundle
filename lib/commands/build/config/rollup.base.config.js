"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rollup_plugin_node_resolve_1 = __importDefault(require("rollup-plugin-node-resolve"));
var rollup_plugin_commonjs_1 = __importDefault(require("rollup-plugin-commonjs"));
var rollup_plugin_replace_1 = __importDefault(require("rollup-plugin-replace"));
var rollup_plugin_json_1 = __importDefault(require("rollup-plugin-json"));
var path_1 = __importDefault(require("path"));
var rollup_plugin_terser_1 = require("rollup-plugin-terser");
var rollup_plugin_sourcemaps_1 = __importDefault(require("rollup-plugin-sourcemaps"));
var rollup_plugin_visualizer_1 = __importDefault(require("rollup-plugin-visualizer"));
var cwd = process.cwd();
var pkgPath = path_1.default.join(cwd, './package.json');
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
        output: { file: "dist/cjs/index.js", format: "cjs", sourcemap: true },
        preserveSymlinks: false,
        plugins: [
            rollup_plugin_sourcemaps_1.default(),
            rollup_plugin_replace_1.default({
                delimiters: ["", ""],
                values: {
                    // replace dynamic checks with if (true) since this is for node only.
                    // Allows rollup's dead code elimination to be more aggressive.
                    "if (isNode)": "if (true)"
                }
            }),
            rollup_plugin_node_resolve_1.default({ preferBuiltins: true }),
            rollup_plugin_commonjs_1.default(),
            rollup_plugin_json_1.default()
        ]
    };
    if (production) {
        baseConfig.plugins.push(rollup_plugin_terser_1.terser());
    }
    return baseConfig;
}
exports.nodeConfig = nodeConfig;
function browserConfig(production) {
    if (production === void 0) { production = false; }
    var baseConfig = {
        input: input,
        output: {
            file: "dist/umd/" + pkgName,
            format: "umd",
            name: "ExampleClient",
            sourcemap: true,
        },
        preserveSymlinks: false,
        plugins: [
            rollup_plugin_sourcemaps_1.default(),
            rollup_plugin_replace_1.default({
                delimiters: ["", ""],
                values: {
                    // replace dynamic checks with if (false) since this is for
                    // browser only. Rollup's dead code elimination will remove
                    // any code guarded by if (isNode) { ... }
                    "if (isNode)": "if (false)"
                }
            }),
            rollup_plugin_node_resolve_1.default({
                mainFields: ["module", "browser"],
                preferBuiltins: false
            }),
            rollup_plugin_commonjs_1.default({
                // When "rollup-plugin-commonjs@10.0.0" is used with "resolve@1.11.1", named exports of
                // modules with built-in names must have a trailing slash.
                // https://github.com/rollup/rollup-plugin-commonjs/issues/394
                namedExports: { "events/": ["EventEmitter"] }
            }),
            rollup_plugin_visualizer_1.default({ filename: "dist/umd/browser-stats.html", sourcemap: false })
        ]
    };
    if (production) {
        baseConfig.output.file = "dist/umd/" + pkgName + ".min.js";
        baseConfig.plugins.push(rollup_plugin_terser_1.terser());
    }
    return baseConfig;
}
exports.browserConfig = browserConfig;
