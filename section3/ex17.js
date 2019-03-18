const yargs = require('yargs');

yargs.command('$0','Add command',{
    title:{
        describe:'Note title',
        demandOption: true,
        type: 'string',
    }
},(argv)=>{
    console.log('Title :',argv.title);
});

yargs.parse(); 

