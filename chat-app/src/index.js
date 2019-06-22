const express = require('express')
const expressApp = express();
const http = require('http');
const path = require('path');
const socket = require('socket.io');
const wordsFilter = require('bad-words');
const {generateMess,generateLocation} = require('./ultils/mess')
const pug = require('pug');

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

//Root endpoint
expressApp.get('/',(req,res)=>{
  res.render('index')
})


io.on('connection',(socket)=>{
  //Send welcome message
  socket.emit('seversend',generateMess('Welcome summoners rift'));

  //Send message to client
  socket.on('clientsend',(message,callback)=>{
    const filter = new wordsFilter()
    if(filter.isProfane(message)){
      return callback('Profanity is not allowed!')
    }
    io.emit('seversend',generateMess(message))
    callback()
  })

  //Send message when a client disconnect
  socket.on('disconnect',()=>{
    io.emit('seversend',generateMess('A user has left chat room!'))
  })

  //Send location of client
  socket.on('sendLocation',(location,callback)=>{
    if(!location){
      return callback('No location information')
    }
    const locationURL = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    socket.broadcast.emit('locationMessage',generateLocation(locationURL))
    callback()
  })
})

server.listen(port,()=>{
  console.log(`Server runing on port : ${port} .`)
});