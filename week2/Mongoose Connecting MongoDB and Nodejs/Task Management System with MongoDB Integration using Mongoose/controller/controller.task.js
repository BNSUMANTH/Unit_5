const task=require('../Model/task.model')

const getTask=async(req,res)=>{
    let data=await task.find()
    res.status(200).json({data})
}

const addTask=async(req,res)=>{
    let data=req.body
    let re=await task.create(data)
    res.status(200).send({Message:"post successfully"})
}

const updateTask=async(req,res)=>{
    let {status,title}=req.body
    let id=req.params.id

    let re=await task.findByIdAndUpdate(id,{status:status,title:title},{new:true})

    res.status(200).send({MSg:"successfully update"})
}

const deleteTask=async(req,res)=>{
    let id=req.params.id
    let re=await task.findByIdAndDelete(id)
    res.status(200).send({msg:"sucessfully delete"})
}

module.exports={getTask,addTask,updateTask}