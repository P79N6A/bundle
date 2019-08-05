import { TransformOptions } from '@babel/core';
export declare type buildOptions = {
    entry: string;
    extensions: string[];
    relative: boolean;
    copyFiles: boolean;
    keepFileExtension: boolean;
    filenames: string;
    outDir: string;
};
export declare type babelOptions = TransformOptions;
export declare type rollupOptions = {};
export declare type versionOptions = any;
