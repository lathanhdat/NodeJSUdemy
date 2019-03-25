const experss = require('express')
const taskRouter = require('./routers/tasks')
const userRouter = require('./routers/users')
require('./db/mongoose')

const appExpress = experss()
const port = process.env.PORT || 3000

appExpress.use(experss.json())
appExpress.use(userRouter)
appExpress.use(taskRouter)

appExpress.listen(port,()=>{})
