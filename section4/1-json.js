const fs = require('fs');
const yargs = require('yargs');

yargs.command('add','Add new notes',{
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
},(title,author)=>{
    notes_add(title,author);
});
yargs.parse();


// const book = {
//     title : 'Sherlock Home',
//     author: 'Tdat'
// }
// const bookJSON = JSON.stringify(book); //Convert object to JSON.
// const parseData = JSON.parse(bookJSON); //Convert JSON back to object
// console.log(bookJSON);
// console.log(parseData.author);

// fs.writeFileSync('book.json',bookJSON);//Create JSON file

// const readBuffer = fs.readFileSync('book.json');
// console.log(readBuffer);
// console.log(readBuffer.toString());

// const data=JSON.parse(readBuffer.toString());
// console.log(data.title);

const readBuffer = fs.readFileSync('book.json');
const data = JSON.parse(readBuffer.toString());
data.name = 'dat';
data.age = '23';
console.log(data);
fs.writeFileSync('book.json',JSON.stringify(data));