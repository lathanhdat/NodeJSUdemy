require('./db/mongoose')
const Task = require('./models/tasks')

// Task.findOneAndDelete({task: 'Delette me'}).then((task)=>{
//     console.log(task)
//     return Task.find({isDone:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })

const deletteTaskAndList = async(delettetask)=>{
    const taskDelette = await Task.findOneAndDelete({task: delettetask})
    const listTasks = await Task.find({isDone:false})
    // return taskDelette
    return listTasks
}

deletteTaskAndList('Delette me').then((list)=>{
    console.log(list)
}).catch((e)=>{
    console.log(e)
})