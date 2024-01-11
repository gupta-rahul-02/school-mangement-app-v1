const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please provide the first name'],
        maxLength:[40,'Name should be lsess than 40 chars']
    },
    lastName:{
        type:String,
        required:[true,'Please provide the last name'],
        maxLength:[40,'Name should be lsess than 40 chars']
    },
    email:{
        type:String,
        required:[true,'Please provide the email'],
        unique:true        
    },
    password:{
        type:String,
        required:[true,'Please provide the name'],
        maxLength:[10,'Name should be lsess than 10 chars'],
        select:false
    },
    role:{
       type:String,
       enum:['admin','teacher','student'],
       default: 'student'
    },
    requestRole:{
        type:String,
        default:'user'
    },
    attendance:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'attendances'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isValidatedPassword = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword, this.password)
}

userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}
module.exports = mongoose.model("User",userSchema)