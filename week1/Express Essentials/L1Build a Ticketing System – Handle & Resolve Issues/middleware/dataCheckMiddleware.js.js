

const dataCheckMiddleware=(req,res,next)=>{
    const {title,description,priority,user}=req.body;
    if(!title || !description || !priority || !user ){
        return res.status(400).send("all fields are required")
    }
    next()
}

module.exports={dataCheckMiddleware}