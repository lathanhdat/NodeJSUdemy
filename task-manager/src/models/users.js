const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const Task = require('./tasks')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    account:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 5
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
        unique:true,
        trim:true,
        lowercase: true,
        required: true,
        validate(email){
            if(!validator.isEmail(email)) throw new Error('This is not an invalid email.')
        }
    },
    tokens:[{
        token : {
            type : String,
            required : true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps : true
});

userSchema.virtual('usertasks',{
    ref: 'tasks',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateToken = async function (){
    const user = this
    const token =jwt.sign({_id : user._id.toString()},'tasktoken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON = function (){
    const user = this
    const userData = user.toObject()
    delete userData.password
    delete userData.tokens
    delete userData.avatar
    return userData
}


userSchema.statics.findByCredentials = async (account,password) =>{
    const user = await User.findOne({account})
    if(!user) throw new Error('Unable to login')
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) throw new Error ('Try again')
    return user
}

//Hash password
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('Users',userSchema);
module.exports = User