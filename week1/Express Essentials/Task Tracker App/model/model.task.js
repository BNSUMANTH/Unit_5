const fs=require("fs")


const gettasks=()=>{
    const tasks=fs.readFileSync("db.json","utf-8")
    return JSON.parse(tasks)
}

const createTask=(task)=>{

    fs.writeFileSync("db.json",JSON.stringify(task,null,2))
}

module.exports={gettasks,createTask}