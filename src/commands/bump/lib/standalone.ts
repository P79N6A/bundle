import { executeCommand } from "../../../utils";
import path from "path";
import { versionOptions } from "../../../types";
export default async function lerna(args: {
  versionOptions: versionOptions;
  standaloneOptions: any;
}) {
  const projectPath = path.resolve(process.cwd());
  const standardArgs: string[] = [];
  try {
    await executeCommand("standard-version", standardArgs, projectPath);
  } catch (err) {
    console.error(err);
  }
}
