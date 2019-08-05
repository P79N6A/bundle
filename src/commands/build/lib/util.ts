import * as babel from "@babel/core";
import readdirRecursive from "fs-readdir-recursive";
import { TransformOptions } from "@babel/core";
import fs from "fs";
import path from "path";
const CALLER = {
  name: "@babel/cli"
};
export const DEFAULT_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
/**
 * 根据后缀名判断是否能编译该文件
 * @param filename
 * @param allExts
 */
export function isComibleExtension(filename: string, allExts?: string[]) {
  const exts = allExts || DEFAULT_EXTENSIONS;
  const ext = path.extname(filename);
  return exts.includes(ext);
}
/**
 * 调整文件后缀为.js
 * @param relative
 * @param keepFileExtension
 */
export function adjustRelative(relative: string, keepFileExtension: boolean) {
  if (keepFileExtension) {
    return relative;
  }
  return relative.replace(/\.(\w*?)$/, "") + ".js";
}
/**
 *
 */
export function deleteDir(pathname: string) {
  if (fs.existsSync(pathname)) {
    fs.readdirSync(pathname).forEach(file => {
      const curPath = path.join(pathname, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathname);
  }
}

export function compile(filename: string, babelOptions: TransformOptions) {
  babelOptions = {
    ...babelOptions,
    caller: CALLER
  };
  return new Promise<babel.BabelFileResult| null>((resolve, reject) => {
    babel.transformFile(filename, babelOptions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
type ReaddirFilter = (filename: string) => boolean;

export function readdir(
  dirname: string,
  includeDotfiles: boolean,
  filter?: ReaddirFilter,
): Array<string> {
  return readdirRecursive(dirname, (filename: string, _index: number, currentDirectory: string) => {
    const stat = fs.statSync(path.join(currentDirectory, filename));

    if (stat.isDirectory()) return true;

    return (
      (includeDotfiles || filename[0] !== ".") && (!filter || filter(filename))
    );
  });
}

export function addSourceMappingUrl(code: string, loc: string): string {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
}

export function chmod(src:string, dest:string){
  fs.chmodSync(dest, fs.statSync(src).mode);
}