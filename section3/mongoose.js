const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex: true
})

const User = mongoose.model('User',{
    name : {
        type : String
    },
    age:{
        type : Number
    }
})

const dat = new User({
    name : 'Dat',
    age : 23
})

dat.save().then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
}
)
