var jwt = require('jsonwebtoken');
require("dotenv").config()
let tokenValidMiddleware = async(req,res,next)=>{
    try {
        let token = req.headers?.authorization?.split(" ")[1]
        var decoded = jwt.verify(token, process.env.jwt_security_key);
        if(!decoded){
            return res.status(402).json({message:"Invalid token"})
        }
        req.user = decoded.userId 
        next()
    } catch (error) {
        if(error.message=="jwt expired"){
            return res.status(400).json({message:"Token Expired , please login again"})
        }
        res.status(500).json({message:error.message})
    }
}
module.exports = tokenValidMiddleware