
const mongoose=require('mongoose')

const taskmanagment=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        require:true
    },
    isCompleted:{
        type:Boolean,
        require:true,
    },
    completionDate:{
        type:Date,
        require:false
    },
    duedate:{
        type:Date,
        require:true
    }
})

const task=mongoose.model("taskmanagent",taskmanagment)

module.exports=task