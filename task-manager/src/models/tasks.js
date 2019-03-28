const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema;
const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    descript:{
        type: String
    },
    isDone:{
        type : Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User' //Model User
    }
});
module.exports = mongoose.model('tasks',taskSchema);