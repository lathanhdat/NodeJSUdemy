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
        ref: 'Users' //Model User
    }
},{
    timestamps: true
});
module.exports = mongoose.model('tasks',taskSchema);