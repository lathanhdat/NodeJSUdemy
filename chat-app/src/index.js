const express = require('express')
const expressApp = express();
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const port = process.env.PORT || 3000
const server = http.createServer(expressApp)
const io = socket(server);

//Define path 
const viewsPath = path.join(__dirname,'../views');
const publicPath = path.join(__dirname,'../public');

//Setup static directory
expressApp.use(express.static(publicPath));

//Setup render engine
expressApp.set('views',viewsPath);
expressApp.set('view engine','pug');

expressApp.get('/',(req,res)=>{
    res.render('index',{
        title: 'Index Page'
    })
})

io.on('connection',()=>{
    console.log('New connect');
})

server.listen(port,()=>{
    console.log(`Server runing on port : ${port} .`)
});