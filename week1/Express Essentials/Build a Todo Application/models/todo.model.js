const fs = require("fs");

const getTodos = () => {
    const todos = fs.readFileSync("db.json","utf-8");
    console.log(todos); 
    return JSON.parse(todos);
}

const addTodo = (todo) => {
    
    fs.writeFileSync("db.json",JSON.stringify(todo));
}

module.exports = {
    getTodos,
    addTodo
}