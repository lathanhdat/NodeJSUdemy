const experss = require('express')
const User = require('./models/users')
require('./db/mongoose')

const appExpress = experss()
const port = process.env.PORT || 3000

appExpress.use(experss.json())

appExpress.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status.send(err)
    })
})

appExpress.listen(port,()=>{

})
