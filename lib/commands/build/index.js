"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var babel_1 = __importDefault(require("./lib/babel"));
var tsc_1 = __importDefault(require("./lib/tsc"));
var tsconfig_json_1 = __importDefault(require("./config/tsconfig.json"));
var commander_1 = __importDefault(require("commander"));
commander_1.default
    .description("公共库编译")
    .option("--copy-files [value]", "拷贝不能编译的文件内容（如.md等文件)", true)
    .option("--source-maps [true|false]", "是否开启sourcemap", booleanify)
    .option("--entry [value]", "入口entry")
    .option("--outDir [value]", "编译产物目录")
    .option("-x, --extensions [extensions]", "需要编译的文件后缀，默认为[.es6,.js,.es,.jsx,.mjs]")
    .action(function (cmd) { return __awaiter(_this, void 0, void 0, function () {
    var opts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                opts = cmd.opts();
                return [4 /*yield*/, tsc_1.default({
                        options: opts,
                        tscOptions: tsconfig_json_1.default
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, babel_1.default({
                        buildOptions: __assign({}, opts, { outDir: "dist/esm" }),
                        babelOptions: {
                            configFile: path_1.default.join(__dirname, './config/babel.esm.js')
                        }
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, babel_1.default({
                        buildOptions: __assign({}, opts, { outDir: 'dist/cjs' }),
                        babelOptions: {
                            configFile: path_1.default.join(__dirname, './config/babel.cjs.js')
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .parse(process.argv);
function booleanify(val) {
    if (val == "true" || val == 1) {
        return true;
    }
    if (val == "false" || val == 0 || !val) {
        return false;
    }
    return val;
}
