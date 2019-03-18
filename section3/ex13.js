const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');

console.log(yargs.argv);

yargs.usage('Usage: $0 <command> [options]')
    .command('add','Adding smth',(yargs)=>{
        return yargs.option('usrname').option('passwrd');
    },(usrname,passwrd)=>{
    console.log(usrname + ' ' + passwrd);
}).argv;



yargs.command({
    command: 'remove',
    describe:'Remove',
    handler:() =>{
        console.log('Remove ');
    }
});
yargs.command({
    command: 'list',
    describe: 'List',
    handler:() =>{
        console.log('List');
    }
});
yargs.command({
    command: 'read',
    describe: 'Read',
    handler:() =>{
        console.log('Read');
    }
});