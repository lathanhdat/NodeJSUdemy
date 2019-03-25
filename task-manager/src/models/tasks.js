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
    }
});
module.exports = mongoose.model('tasks',taskSchema);