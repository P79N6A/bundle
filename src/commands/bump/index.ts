
import { Command } from "commander";
import lerna from './lib/lerna';
import standalone from './lib/standalone';
export const register_version: any = (program: Command) => {
  program
    .command("bump")
    .description("更新版本以及生成changelog")
    .option('--type [value]', "项目类型 fixed|independent|standalone")
    .option('--changelog [value]', '是否生成changelog ')
    .action(async (cmd: Command) => {
      const opts = cmd.opts();
      const { type } =opts;
      if(type === 'independent' || type === 'fixed'){
        await lerna({
          versionOptions: {},
          lernaOptions: {}
        });
      }else if(type === 'standalone'){
        await standalone({
          versionOptions: {},
          standaloneOptions: {}
        })
      }
    })
};
