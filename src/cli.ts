import program from 'commander';

program.version('0.0.1')
.description('Facke package manager')
.command('install [name]', 'install on or more packages')
.command('search [query]', 'search with optional query')
.parse(process.argv);
