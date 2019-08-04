import program from 'commander';

program.option('-f, --force','force installation' )
.parse(process.argv);
const pkgs = program.args;
if(!pkgs.length){
  console.error('packages required');
  process.exit(1);
}