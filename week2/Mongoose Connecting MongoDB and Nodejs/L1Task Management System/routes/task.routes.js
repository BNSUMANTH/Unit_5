
const {getTask,addtask,updateTask,deletetask}=require("../controllers/controller.task")

const express=require("express")

const taskroutes=express.Router()

taskroutes.get("/task",getTask)

taskroutes.post('/addtask',addtask)

taskroutes.patch('/task/:id',updateTask)

taskroutes.delete('/deletetask/:id',deletetask)

module.exports=taskroutes
