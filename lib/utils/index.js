"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var execa_1 = __importDefault(require("execa"));
function executeCommand(command, args, targetDir) {
    return new Promise(function (resolve, reject) {
        var child = execa_1.default(command, args, {
            cwd: targetDir,
            shell: true,
            stdio: ["inherit", "inherit", command === "yarn" ? "pipe" : "inherit"]
        });
        child.on('error', function (err) {
            console.log('exec:', err);
        });
        child.on("close", function (code) {
            if (code !== 0) {
                reject(new Error("command failed: " + command + " " + args.join(" ")));
                return;
            }
            else {
                resolve();
            }
        });
    });
}
exports.executeCommand = executeCommand;
