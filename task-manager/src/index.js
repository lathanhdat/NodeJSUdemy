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
    
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
})

appExpress.get('/users',(req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((err)=>{
    //     res.status(500).send(err)
    // })
})

appExpress.get('/users/:id',(req,res)=>{
    const _id = req.params.id;
    try {
        const user = User.findById(_id)
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
    // User.findById(_id).then((user)=>{
    //     if(!user) return res.status(404).send()
    //     res.send(user)
    // }).catch((err)=>{
    //     res.status(500).send(err)
    // })
})

//Task end point
appExpress.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

appExpress.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

appExpress.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task) return res.status(404).send()
        res.send(task)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

appExpress.listen(port,()=>{

})
