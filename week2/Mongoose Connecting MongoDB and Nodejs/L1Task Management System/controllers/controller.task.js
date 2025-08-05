
const task=require('../model/task.model')

const getTask=async(req,res)=>{
    try{
        let data=await task.find()
        res.status(200).json(data)
    }catch(err){
        res.status(400).send({msg:"feach to load"})
    }
}

const addtask=async(req,res)=>{
    try{
        let data=req.body
        await task.insertOne(data)
        res.status(200).send({msg:"add succefully"})
    }
    catch(err){
        res.status(400),send({msg:"error"})
    }
}

const updateTask=async(req,res)=>{
    try{
        let sender=req.body
        let id=req.params.id
    
        if(sender.isCompleted){
            sender.completionDate= new Date()
            console.log(sender)
        }
        
        await task.findByIdAndUpdate(id,sender,{new:true})
        res.status(200).send({msg:"update successfully"})
    }
    catch(err){
        res.status(400).send({msg:"error during updation"})
    }
}

const deletetask=async(req,res)=>{
    try{
        let id=req.params.id
        await task.findByIdAndDelete(id)
        res.status(200).send({msg:"successfull delete"})
    }catch(err){
        console.log(err)
        res.status(400).send({msg:"oops error occured"})
    }
}

module.exports={
    getTask,
    addtask,
    updateTask,
    deletetask
}