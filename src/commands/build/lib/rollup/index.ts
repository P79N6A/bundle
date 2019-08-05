import { buildOptions } from "../../../../types";
import mergeOptions from "./utils/mergeOptions";
import * as rollup from 'rollup';
import { WarningHandler, InputOptions, OutputOptions } from "rollup";
export default async function runRollup({
  options,
  rollupConfigs
}: {
  options: buildOptions;
  rollupConfigs: any;
}) {
  for (const config of rollupConfigs) {
    console.log("config:", config);
    const { inputOptions, outputOptions, optionError } = mergeOptions({
      config,
      command: {
        config: true,
        c: true
      }
    });
    if (optionError)
      (inputOptions.onwarn as WarningHandler)({
        code: "UNKNOWN_OPTION",
        message: optionError
      });
      return build(inputOptions, outputOptions)
  }
}

async function build(inputOptions: InputOptions, outputOptions: OutputOptions[] ){
  const bundle = await rollup.rollup(inputOptions)
  const outputOption = outputOptions[0];
  const { output } = await bundle.generate(outputOption);
  return await Promise.all(outputOptions.map(output => bundle.write(output)));
}