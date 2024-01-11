const user = require('../models/user')
const jwt = require('jsonwebtoken')
exports.loggedInUser = async(req,res) =>{
    try {
        const token= req.cookies.token || req.header("Authorization").replace("Bearer","");
        if(!token){
            res.send('Login first to access')
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
        const user2 = await user.findById(decoded.id)
       return user2
    } catch (error) {
        console.log(error)
        res.json({
            message:error.message
        })
    }
   
    
}