import { babelOptions, buildOptions } from "../../../../types";
export default function lerna(args: {
    buildOptions: buildOptions;
    babelOptions: babelOptions;
}): Promise<void>;
