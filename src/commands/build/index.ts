import path from 'path';
import babel from "./lib/babel";
import tsc from "./lib/tsc";
import tsConfig from "./config/tsconfig.json";
import program from "commander";

program
  .description("公共库编译")
  .option("--copy-files [value]", "拷贝不能编译的文件内容（如.md等文件)", true)
  .option("--source-maps [true|false]", "是否开启sourcemap", booleanify)
  .option("--entry [value]", "入口entry")
  .option("--outDir [value]", "编译产物目录")
  .option(
    "-x, --extensions [extensions]",
    "需要编译的文件后缀，默认为[.es6,.js,.es,.jsx,.mjs]"
  )
  .action(async cmd => {
    const opts = cmd.opts();
    await tsc({
      options: opts,
      tscOptions: tsConfig
    });
    await babel({
      buildOptions: { ...opts, outDir: "dist/esm" },
      babelOptions: {
        configFile: path.join(__dirname, './config/babel.esm.js')
      }
    });
    await babel({
      buildOptions: {...opts, outDir: 'dist/cjs'},
      babelOptions: {
        configFile: path.join(__dirname, './config/babel.cjs.js')
      }
    })
  })
  .parse(process.argv);

function booleanify(val: any): boolean | any {
  if (val == "true" || val == 1) {
    return true;
  }
  if (val == "false" || val == 0 || !val) {
    return false;
  }
  return val;
}
