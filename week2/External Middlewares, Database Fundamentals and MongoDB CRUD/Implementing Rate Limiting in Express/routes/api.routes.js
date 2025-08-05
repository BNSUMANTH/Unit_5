const express=require("express");
const limiter = require("../middlewares/rateLimiter");

const apiRouter=express.Router();

apiRouter.get("/public",(req,res)=>{
    res.status(200).json({message:"This is a public endpoint!"});
})

apiRouter.get("/limited",limiter,(req,res)=>{
    res.status(200).json({message:"You have access to this limited enspoint!"});
})

apiRouter.use("",(req,res)=>{
    res.status(404).json({error:"404 Not Found"})
})

module.exports=apiRouter;