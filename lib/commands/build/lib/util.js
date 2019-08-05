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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel = __importStar(require("@babel/core"));
var fs_readdir_recursive_1 = __importDefault(require("fs-readdir-recursive"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var CALLER = {
    name: "@babel/cli"
};
exports.DEFAULT_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
/**
 * 根据后缀名判断是否能编译该文件
 * @param filename
 * @param allExts
 */
function isComibleExtension(filename, allExts) {
    var exts = allExts || exports.DEFAULT_EXTENSIONS;
    var ext = path_1.default.extname(filename);
    return exts.includes(ext);
}
exports.isComibleExtension = isComibleExtension;
/**
 * 调整文件后缀为.js
 * @param relative
 * @param keepFileExtension
 */
function adjustRelative(relative, keepFileExtension) {
    if (keepFileExtension) {
        return relative;
    }
    return relative.replace(/\.(\w*?)$/, "") + ".js";
}
exports.adjustRelative = adjustRelative;
/**
 *
 */
function deleteDir(pathname) {
    if (fs_1.default.existsSync(pathname)) {
        fs_1.default.readdirSync(pathname).forEach(function (file) {
            var curPath = path_1.default.join(pathname, file);
            if (fs_1.default.lstatSync(curPath).isDirectory()) {
                deleteDir(curPath);
            }
            else {
                fs_1.default.unlinkSync(curPath);
            }
        });
        fs_1.default.rmdirSync(pathname);
    }
}
exports.deleteDir = deleteDir;
function compile(filename, babelOptions) {
    babelOptions = __assign({}, babelOptions, { caller: CALLER });
    return new Promise(function (resolve, reject) {
        babel.transformFile(filename, babelOptions, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.compile = compile;
function readdir(dirname, includeDotfiles, filter) {
    return fs_readdir_recursive_1.default(dirname, function (filename, _index, currentDirectory) {
        var stat = fs_1.default.statSync(path_1.default.join(currentDirectory, filename));
        if (stat.isDirectory())
            return true;
        return ((includeDotfiles || filename[0] !== ".") && (!filter || filter(filename)));
    });
}
exports.readdir = readdir;
function addSourceMappingUrl(code, loc) {
    return code + "\n//# sourceMappingURL=" + path_1.default.basename(loc);
}
exports.addSourceMappingUrl = addSourceMappingUrl;
function chmod(src, dest) {
    fs_1.default.chmodSync(dest, fs_1.default.statSync(src).mode);
}
exports.chmod = chmod;
