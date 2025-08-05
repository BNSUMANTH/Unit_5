
const express=require('express')
const db=require('./config/mongoDb')
const taskrouter=require('./router/task.router')

const app=express()

db()

app.use(express.json())

app.use("/task",taskrouter)

app.listen(3000,()=>{
    console.log("server run on 3000")
})