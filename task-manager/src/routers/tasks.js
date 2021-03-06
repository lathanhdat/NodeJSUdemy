const express = require('express')
const TaskPath = require('path').join(__dirname,'../models/tasks')
const auth = require('../middleware/auth')
const Task = require(TaskPath)
const router = new express.Router()

//Task end point
router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({...req.body,owner:req.user._id})
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(err)
    }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const validUpdates = ['task','isDone'] 
    const isValid = updates.every((update)=> validUpdates.includes(update))
    if(!isValid) return res.status(400).send({error: "Invalid update"})
    try {
        const task = await Task.findOne({_id : _id,owner:req.user._id})
        if(!task) return res.status(404).send()
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.delete('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id:_id,owner:req.user._id})
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.get('/tasks', auth ,async (req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.isDone = req.query.completed === 'true';// result is boolean
    }
    if(req.query.sortBy){
        const sortParts = req.query.sortBy.split(':')
        sort[sortParts[0]] = sortParts[1] === 'asc' ? 1 : -1
    }

    try {
        // const tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path : 'usertasks',
            match,
            options: {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort                                //Shorthand synxtax for sort : sort
            }
        }).execPopulate()
        res.send(req.user.usertasks)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.get('/tasks/:id', auth ,async (req,res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

module.exports = router