const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age:{
        type : Number,
        validate(value){  //We can create our own validator
            if (value<0) throw new Error('Age must be a positive number')
        }
    },
    email:{
        type : String,
        trim:true,
        lowercase: true,
        required: true,
        validate(email){
            if(!validator.isEmail(email)) throw new Error('This is not an invalid email.')
        }
    }
});
module.exports = mongoose.model('Users',userSchema);