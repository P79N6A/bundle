import program from 'commander';
import path from 'path';
import fs from 'fs';
const pkgPath = path.join(__dirname, '../package.json');
console.log('pkgPath:', pkgPath);
const pkg = fs.readFileSync(pkgPath).toString();
const { version } = JSON.parse(pkg);


program.version(version)
.description('Facke package manager')
.command('install [name]', 'install on or more packages')
.command('search [query]', 'search with optional query')
.parse(process.argv);
