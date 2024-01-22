
const Attendance = require("../models/attendance");
const User = require("../models/user");

exports.addAttenndance = async(req,res,next) =>{
    try {
        const email = req.params.email;
        const status = req.params.status;
        const {date} =  req.body
       
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error('User Not Found')
        }

        const attendanceData = await Attendance.findOne({user:user._id,date:new Date(date)})

        if(attendanceData){
           
            attendanceData.status = status
            await attendanceData.save()

            const dateToFind = new Date(date)
            const index  = user.attendance.findIndex(attend => attend.date.getTime() === dateToFind.getTime())
            console.log(index)
            if(index!==-1){
                user.attendance[index].status = status
                await user.save() 
            }
            res.json({
                message:'Attendance added'
            })
        }else{
            
        const newAttendance = new Attendance({
            user:user._id,
            status:status,
            date: new Date(date)
        })
        
        const savedAttendance = await newAttendance.save()
        user.attendance.push({
            _id:newAttendance._id,
            status:status,
            date: new Date(date)
        })
        await user.save()
        
        res.json({
            message:'Attendance added',
            attendance:savedAttendance
        })
        }
       



      


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