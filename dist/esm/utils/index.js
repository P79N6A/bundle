"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeCommand = executeCommand;

var _execa = _interopRequireDefault(require("execa"));

function executeCommand(command, args, targetDir) {
  return new Promise(function (resolve, reject) {
    var child = (0, _execa["default"])(command, args, {
      cwd: targetDir,
      shell: true,
      stdio: ["inherit", "inherit", command === "yarn" ? "pipe" : "inherit"]
    });
    child.on('error', function (err) {
      console.log('exec:', err);
    });
    child.on("close", function (code) {
      if (code !== 0) {
        reject(new Error("command failed: ".concat(command, " ").concat(args.join(" "))));
        return;
      } else {
        resolve();
      }
    });
  });
}