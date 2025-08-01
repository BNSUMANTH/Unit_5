const {gettasks,createTask}=require("../model/model.task")

const tasks=(req,res)=>{
    const tasks=gettasks()
    res.json(tasks)
}

const addtask=(req,res)=>{
    let task=req.body
    const tasks=gettasks()
    task={...task,id:tasks.tasks.length+1}
    tasks.tasks.push(task)
    createTask(tasks)
    res.json({message:"Task created successfully"})
}

const updatetask=(req,res)=>{
    const id=req.params.id
    const task=req.body
    const tasks=gettasks()
    const taskIndex=tasks.tasks.findIndex(task=>task.id==id)
    if(taskIndex!==-1){
        tasks.tasks[taskIndex]={...task,...tasks.tasks[taskIndex]}
        createTask(tasks)
        res.json({message:"Task updated successfully"})
    }
    else{
        res.status(404).json({message:"Task not found"})
    }
}

const deletetask=(req,res)=>{
   const id=req.params.id
   const tasks=gettasks()
   const taskIndex=tasks.tasks.findIndex(task=>task.id==id)
   if(taskIndex!==-1){
    tasks.tasks.splice(taskIndex,1)
    createTask(tasks)
    res.json({message:"Task deleted successfully"})
   }
   else{
    res.status(404).json({message:"Task not found"})
   }
}

const filtertasks=(req,res)=>{
    const tag=req.query.tag
    const tasks=gettasks()
    const filteredTasks=tasks.tasks.filter(task=>task.tag==tag)
    if(filteredTasks.length>0){
        res.json(filteredTasks)
    }
    else{
        res.status(404).json({message:"No tasks found"})
    }
}

module.exports={tasks,addtask,updatetask,deletetask,filtertasks}