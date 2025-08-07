const express=require("express");
const userModel = require("../models/user.models");
// const { findByIdAndUpdate } = require("../../../Mongoose Connecting MongoDB and Nodejs/L1Task Management System/model/task.model");

const userRouter=express.Router();

userRouter.post("/",async (req,res)=>{
   try {
    const user=await userModel.create(req.body);
    res.status(201).json({msg:"new user created",user:user})
   } catch (error) {
    res.status(500).json({msg:"internal server error"});
   }
   
})

userRouter.patch("/:id/addres",async (req,res)=>{
    const {id}=req.params;

    let user= await userModel.findById(id);
    if(!user){
        res.status(404).json({msg:"user not found"});
    }
    else{
       user.address.push(req.body);
       await user.save();
    //    console.log(user);
       res.status(200).json({msg:"user address pushed", user:user});
    }
})

userRouter.get("/summary",async(req,res)=>{
    let allUsers=await userModel.find();
    let totalNumberOfUsers=allUsers.length;
    let totalAddresses=0;
    
    let list=allUsers.map((user)=>{
      let count=user.address.length;
      totalAddresses+=count;
      return {name:user.name,numOfAdd:count}
    })
    res.status(200).json({totalNumOfUsers:totalNumberOfUsers,totalNumberOfAdd:totalAddresses,users:list})
})

userRouter.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const user= await userModel.findById(id);
    if(!user){
        res.status(404).json({msg:"User not Found..."});
    }
    else{
        res.status(200).json({userfullDetails:user})
    }

})

module.exports=userRouter;