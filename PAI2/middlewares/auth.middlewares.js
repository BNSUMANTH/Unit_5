require('dotenv').config()
const authmiddleware=(req,res,next)=>{
    try{
        let token=req.headers?.Authorization?.split(' ')[1]
        if(token){
            var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decoded)
            return res.status(200).send({message:'welcome back'})
        }
        next()
    }catch(err){
       res.status(400).send({msg:"somthing went wrong"})
    }
}

module.exports=authmiddleware;