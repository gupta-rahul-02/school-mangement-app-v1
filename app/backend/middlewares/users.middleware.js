const user = require("../models/user");
const jwt = require('jsonwebtoken');
// const CustomError = require("../utils/customError");

exports.isLoggedIn = async(req,res,next)=>{

    const token = req.cookies.token || req.header("Authorization").replace("Bearer","");
    if(!token){
        res.send('Login first to access')
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await user.findById(decoded.id)

    next()
}

exports.customRoles = (...roles) =>{
    return(req,res,next) =>{
        try {
            if(!roles.includes(req.user.role)){
               
            throw new Error('You are not allowed ')
            }
            next()
        } catch (error) {
            res.json({
                message:error.message
            })
        }
       
    }
}