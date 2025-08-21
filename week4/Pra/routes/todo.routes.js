const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middleware");

const TodoRouter = express.Router();
/// Routes will decided role to be allowed
TodoRouter.post("/add-todo", authMiddleware(["user", "admin"]),async (req,res)=>{
    try{
     let todo = await TodoModel.create({...req.body, userId:req.user});
     res.status(200).json({message:"Todo Added", todo})
    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
    }
})


TodoRouter.get("/alltodos",authMiddleware(["user","admin"]) ,async(req,res)=>{
    
    try{
        //console.log(req.user)
        // Attached the userID from Auth Middleware
        let todos = await TodoModel.find({userId:req.user});
        res.status(200).json({message:"Todos List",todos})
       }catch(err){
           res.status(500).json({ message: "Something went wrong" });
       }
})
module.exports =TodoRouter;
