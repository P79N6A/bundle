import { executeCommand } from '../../../../utils';
import path from 'path'
import { buildOptions } from '../../../../types';
export default async  function tsc(args: {
  options: buildOptions,
  tscOptions: any
}){
  const projectPath = path.resolve(process.cwd());
  const tscArgs: string[] = [];
  try {
    await executeCommand('tsc',tscArgs, projectPath )
  }catch(err){
    console.error(err);
  }
}