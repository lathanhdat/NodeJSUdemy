const experss = require('express')
const User = require('./models/users')
const Task = require('./models/tasks')
require('./db/mongoose')

const appExpress = experss()
const port = process.env.PORT || 3000

appExpress.use(experss.json())

//User end point
appExpress.post('/users',async(req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

appExpress.patch('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        console.log(_id)
        console.log(req.body)
        const user = await User.findByIdAndUpdate(_id,req.body,{new : true, runValidators:true})
        if(!user) return res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

appExpress.get('/users',async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

appExpress.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

//Task end point
appExpress.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(err)
    }
})

appExpress.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(err)
    }
})

appExpress.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

appExpress.listen(port,()=>{

})
