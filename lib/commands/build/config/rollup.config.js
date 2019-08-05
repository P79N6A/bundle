"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base = __importStar(require("./rollup.base.config"));
var inputs = [];
if (!process.env.ONLY_BROWSER) {
    inputs.push(base.nodeConfig());
}
if (!process.env.ONLY_NODE) {
    inputs.push(base.browserConfig());
    inputs.push(base.browserConfig(true));
}
exports.default = inputs;
