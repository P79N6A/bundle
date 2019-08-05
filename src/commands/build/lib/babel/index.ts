import { executeCommand } from "../../../../utils";
import shell from 'shelljs';
import path from "path";
import { babelOptions, buildOptions } from "../../../../types";
export default async function lerna(args: {
  buildOptions: buildOptions;
  babelOptions: babelOptions;
}) {
  const projectPath = path.resolve(process.cwd());
  const babelArgs: string[] = [];
  babelArgs.push('src')
  babelArgs.push('--out-dir dist/esm')
  babelArgs.push('--ignore src/**/*.d.ts')
  babelArgs.push('--delete-dir-on-start')
  babelArgs.push("--extensions '.ts,.tsx,.js,.jsx'")
  try {
    // await shell.exec(`yarn babel src --out-dir dist/esm --ignore src/**/*.d.ts --delete-dir-on-start --extensions '.ts,.tsx,.js,.jsx'`)
    await executeCommand("yarn babel",babelArgs, projectPath);
  } catch (err) {
    console.error(err);
  }
}