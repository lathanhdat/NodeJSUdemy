const express = require('express'); //Function
const appExpress = express();//Application
const path = require('path');

//Define path 
const viewsPath = path.join(__dirname,'../templates');
const publicPath = path.join(__dirname,'../public');

//Setup static directory
appExpress.use(express.static(publicPath));

//Setup render engine
appExpress.set('views',viewsPath);
appExpress.set('view engine','pug');

appExpress.get('/',(req,res)=>{
    res.render('index',{
        title : 'Index page'
    });
})


appExpress.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help page'
    });;
})

appExpress.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About us'
    });;
})

appExpress.get('/weather',(req,res)=>{
    res.send('Weather');
})

appExpress.get('/help/*',(req,res)=>{
    res.render('notfound',{
        error : 'Help article not found'
    });;
})

appExpress.get('*',(req,res)=>{
    res.render('notfound',{
        error : 'Page not found'
    });;
})


appExpress.listen(4000,()=>{
    console.log('Server in running on port 3000');
})