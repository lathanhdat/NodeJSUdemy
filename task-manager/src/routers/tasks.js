const express = require('express')
const TaskPath = require('path').join(__dirname,'../models/tasks')
const auth = require('../middleware/auth')
const Task = require(TaskPath)
const router = new express.Router()

//Task end point
router.post('/tasks',auth,async (req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(err)
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const validUpdates = ['task','isDone'] 
    const isValid = updates.every((update)=> validUpdates.includes(update))
    if(!isValid) return res.status(400).send({error: "Invalid update"})
    try {
        const task = await Task.findById(_id)
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

module.exports = router