
const program = require('commander')
const {init} = require('./init')

program
    .command('init <name>')
    .description('init project')
    .action(init)

program.parse(process.argv)
