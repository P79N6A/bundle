import { executeCommand } from "../../../utils";
import path from "path";
import { versionOptions } from "../../../types";
export default async function lerna(args: {
  versionOptions: versionOptions;
  lernaOptions: any;
}) {
  const projectPath = path.resolve(process.cwd());
  const lernaArgs: string[] = [];
  lernaArgs.push('version');
  lernaArgs.push("--conventional-commits");
  try {
    await executeCommand("lerna", lernaArgs, projectPath);
  } catch (err) {
    console.error(err);
  }
}
