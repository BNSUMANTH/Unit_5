const {tasks,addtask,updatetask,deletetask,filtertasks}=require("../controller/controller.rask")

const  express = require("express");

const taskRouter = express.Router();

taskRouter.get("/gettasks",tasks) 
taskRouter.post("/addtasks",addtask)
taskRouter.put("/updatetasks/:id",updatetask)
taskRouter.delete("/deletetasks/:id",deletetask)
taskRouter.get("/filtertasks",filtertasks)


module.exports = taskRouter;




