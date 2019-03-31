const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const UserPath = require('path').join(__dirname,'../models/users')
const auth = require('../middleware/auth')
const User = require(UserPath)
const router = new express.Router()

//Upload config
const upload = multer({
    // dest : 'avatars',
    limits: {
        fileSize : 1000000
    },
    fileFilter(req,file,callback){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))  //Regular expression
        // if (!file.originalname.endsWith('.pdf'))
        return callback(new Error('Filemust be a PDF'))
        callback(undefined,true)

        // return error : callback(new Error('Filemust be a PDF'))
        // return succescc :callback(undefined,true)
    }
})

//User end point
router.post('/users',async(req,res)=>{
    const user = new User(req.body)
    try {
        const token = await user.generateToken()
        await user.save()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.account,req.body.password)
        const token = await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({
        width : 250,
        height: 250
    }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error : error.message})
})

router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','email','password','age']
    const isValid = updates.every((update)=> allowedUpdate.includes(update))

    if(!isValid) return res.status(400).send({error: 'Invalid updates!'})
    try {
        const user = req.user
        updates.forEach((update)=> user[update]=req.body[update])
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me',auth,async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/me/avatar', auth, async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
})

router.get('/users/all',async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id/avatar', async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user.avatar || !user) throw new Error()
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send()
    }
})


module.exports = router