import program from 'commander';
import path from 'path';
import fs from 'fs';
import process from 'process';
const pkgPath = path.join(__dirname, '../package.json');
const pkg = fs.readFileSync(pkgPath).toString();
const { version } = JSON.parse(pkg);
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection:', err);
})


program.version(version)
.description('Facke package manager')
.command('build', 'build library')
.command('install [name]', 'install on or more packages')
.command('search [query]', 'search with optional query')
.parse(process.argv);

if (!program.args.length) program.help();
