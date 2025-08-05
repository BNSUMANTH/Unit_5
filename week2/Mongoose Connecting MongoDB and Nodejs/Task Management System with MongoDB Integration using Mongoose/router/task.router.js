const {getTask,addTask,updateTask} =require('../controller/controller.task')
const express=require('express')

const taskrouter=express.Router()

taskrouter.get("/getTask",getTask)

taskrouter.post("/addtask",addTask)

taskrouter.patch("/updateTask/:id",updateTask)

// taskrouter.delete("/DeleteTask",deleteTask)

module.exports=taskrouter