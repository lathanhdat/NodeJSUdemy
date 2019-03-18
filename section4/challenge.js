const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const notes_get = (file)=>{
    try {
        return JSON.parse(fs.readFileSync(file).toString());
    } catch (error) {
        return [];
    }
};

const notes_set = (file,data)=>{
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync(file,dataJSON);
};

const notes_add = (file,title,author)=>{
    const successLog = chalk.green.inverse(`Added note: ${title}.`);
    const duplicatedLog = chalk.red.inverse(`Note title:"${title}" duplicated.`);
    const notes = notes_get(file);
    // const duplicated = notes.filter((note)=> note.Title === title);
    const duplicated = notes.find((note)=> note.Title === title);
    if(!duplicated)
    {
        notes.push({
            Title : title,
            Author : author
        });
        notes_set(file,notes);
        console.log(successLog);
    }
    else
    {
        console.log(duplicatedLog);
    }
};

const notes_remove = (file,title)=>{
    const successLog = chalk.green.inverse(`Removed note: ${title}.`);
    const notfoundLog = chalk.red.inverse(`Note title:"${title}" does not exist.`);
    const notes = notes_get(file);
    // const duplicated = notes.filter((note)=>{
    //     return note.Title === title;
    // });
    // if(duplicated.length !== 0)
    // {
    //     const notes_filed = notes.filter((note)=>{
    //         return note.Title !== title;
    //     });
    //     console.log(successLog);
    //     notes_set(file,notes_filed);
    // }
    // else
    // {
    //     console.log(notfoundLog);
    // }

    const notes_filed = notes.filter((note)=> note.Title !== title);
    if(notes_filed.length < notes.length )
    {
        console.log(successLog);
        notes_set(file,notes_filed);
    }
    else
    {
        console.log(notfoundLog);
    }
};

const notes_list = (file) =>{
    const notes = notes_get(file);
    const successLog = chalk.green.inverse(`List notes in ${file}.`);
    console.log(successLog);
    notes.forEach((note)=>{
        console.log(note.Title);
    });
};

const notes_read = (file,title) =>{
    const notes = notes_get(file);
    const successLog = chalk.green.inverse(`Note title:"${title}" in "${file}".`);
    const notfoundLog = chalk.red.inverse(`Note title:"${title}" in "${file}" does not exist.`);
    const resultNote = notes.find((note)=> note.Title === title);
    if(resultNote)
    {
        console.log(successLog);
        console.log("Title: " + resultNote.Title);
        console.log("Author: " + resultNote.Author);
    }
    else
    {
        console.log(notfoundLog);
    }
};




//Create "add" command.
yargs.command('add','Add new note',{
    file:{
        describe: 'File storing data',
        demandOptions: true,
        type:'string'
    },
    title:{
        describe: 'Title of book',
        demandOptions: true,
        type:'string'
    },
    author:{
        describe: 'Author name',
        demandOptions: true,
        type:'string'
    },
},(argv)=>{
    notes_add(argv.file,argv.title,argv.author);
});

//Create "remove" command
yargs.command('remove','Remove a note',{
    file:{
        describe: 'File storing data',
        demandOptions: true,
        type:'string'
    },
    title:{
        describe: 'Title of book',
        demandOptions: true,
        type:'string'
    }
},(argv)=>{
    notes_remove(argv.file,argv.title);
});

//Create "list" command
yargs.command('list','List all notes',{
    file:{
        describe: 'File storing data',
        demandOptions: true,
        type:'string'
    },
},(argv)=>{
    notes_list(argv.file);
});

//Create "read" command
yargs.command('read','List all notes',{
    file:{
        describe: 'File storing data',
        demandOptions: true,
        type:'string'
    },
    title:{
        describe: 'Title of book',
        demandOptions: true,
        type:'string'
    }
},(argv)=>{
    notes_read(argv.file,argv.title);
});
yargs.parse();

