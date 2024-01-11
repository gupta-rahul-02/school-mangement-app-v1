
const Attendance = require("../models/attendance");
const User = require("../models/user");

exports.addAttenndance = async(req,res,next) =>{
    try {
        const email = req.params.email;
        const status = req.params.status
        const user = await User.findOne({email:email});

        if(!user){
            throw new Error('User Not Found')
        }

        const newAttendance = new Attendance({
            user:user._id,
            status:status
        })

        const savedAttendance = await newAttendance.save()

        res.json({
            message:'Attendance added',
            attendance:savedAttendance
        })


    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

exports.getAttendanceOfUser = async(req,res,next) =>{
    try {
        const {email} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error('User not found')
        }
        
        const attendance = await Attendance.find({user:user._id})
        res.json({
            attendance: attendance.length
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}