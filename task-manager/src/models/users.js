const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    account:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
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

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    } 
    next()
})

module.exports = mongoose.model('Users',userSchema);