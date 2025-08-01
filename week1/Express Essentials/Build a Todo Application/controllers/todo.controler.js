const {getTodos,addTodo} = require("../models/todo.model");

const getT = (req,res) => {
   const todos = getTodos();
   console.log(todos);  
   res.status(200).send({message:"Todos fetched successfully",todos});
}

const addT=(req,res)=>{
    const {title,completed} = req.body;
    const todo = {
        id:getTodos().todos.length+1,
        title,
        completed
    }
    const todos = getTodos();
    todos.todos.push(todo);
    addTodo(todos);
    res.status(201).json({todo});
}

const updateT = (req,res)=>{
    const {id} = req.params;
    const {title,completed} = req.body;
    console.log(id,title,completed);
    const todos = getTodos();
    const todo = todos.todos.find(todo=>todo.id == id);
    if(!todo){
        return res.status(404).json({message:"Todo not found"});
    }
    todo.title = title;
    todo.completed = completed;
    addTodo(todos);
    res.status(200).json({message:"Todo updated successfully",todo});
}
const deleteT = (req,res)=>{
    const {id} = req.params;
    const todos = getTodos();
    const todo = todos.todos.find(todo=>todo.id == id);
    if(!todo){
        return res.status(404).json({message:"Todo not found"});
    }
    todos.todos = todos.todos.filter(todo=>todo.id !== id);
    addTodo(todos);
    res.status(200).json({message:"Todo deleted successfully"});
}

module.exports = {
    getT,
    addT,
    updateT,
    deleteT
}