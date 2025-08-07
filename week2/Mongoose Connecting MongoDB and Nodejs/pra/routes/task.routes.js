const express = require("express");
const TaskModel = require("../models/task.models");


const taskRoutes = express.Router();

taskRoutes.get("/all-tasks", async (req, res) => {
    try {
        let tasks = await TaskModel.find({});
        res.status(200).json({ msg: "all tasks", tasks: tasks })
    } catch (error) {
        // console.log("error while getting data",error);
        res.status(500).json({ msg: "somting went wrong" });
    }
})

taskRoutes.post('/add-tasks',async(req,res)=>{
    let task= await TaskModel.create(req.body)
    res.json({msg:"Task Added"})
})

taskRoutes.patch("/update-task/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let task = await TaskModel.findById(id);
        if (!task) {
            res.status(404).json({ msg: "task is not found" });
        }
        else {
            let updatedTask = await TaskModel.findByIdAndUpdate(id, req.body);
            res.status(200).json({ msg: "updated task", task: updatedTask })
        }
    } catch (error) {
        res.json({ error: error });
    }
})

taskRoutes.delete("/delete-task/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let task = await TaskModel.findById(id);
        if (!task) {
            res.status(404).json({ msg: "task is not found" });
        }
        else {
            let updatedTask = await TaskModel.findByIdAndDelete(id);
            res.status(200).json({ msg: "deleted task", task: updatedTask })
        }
    } catch (error) {
        res.json({ error: error });
    }
})


module.exports = taskRoutes;