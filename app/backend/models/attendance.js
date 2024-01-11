const mongoose = require('mongoose')


const attendanceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    date:{
        type:Date,
        default:Date.now,
    },
    status:{
        type:String,
        enum:['present','absent'],
        default:'absent'
    }
})

module.exports = mongoose.model("Attendance",attendanceSchema)