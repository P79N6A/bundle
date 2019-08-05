import * as babel from "@babel/core";
import { TransformOptions } from "@babel/core";
export declare const DEFAULT_EXTENSIONS: string[];
/**
 * 根据后缀名判断是否能编译该文件
 * @param filename
 * @param allExts
 */
export declare function isComibleExtension(filename: string, allExts?: string[]): boolean;
/**
 * 调整文件后缀为.js
 * @param relative
 * @param keepFileExtension
 */
export declare function adjustRelative(relative: string, keepFileExtension: boolean): string;
/**
 *
 */
export declare function deleteDir(pathname: string): void;
export declare function compile(filename: string, babelOptions: TransformOptions): Promise<babel.BabelFileResult | null>;
declare type ReaddirFilter = (filename: string) => boolean;
export declare function readdir(dirname: string, includeDotfiles: boolean, filter?: ReaddirFilter): Array<string>;
export declare function addSourceMappingUrl(code: string, loc: string): string;
export declare function chmod(src: string, dest: string): void;
export {};
