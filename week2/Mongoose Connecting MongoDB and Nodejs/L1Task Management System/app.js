

const express=require('express')
const db=require('./config/db')
const taskroutes=require('./routes/task.routes')

db()

const app=express()
app.use(express.json())


app.use("/task",taskroutes)


app.listen(4646,()=>{
    console.log("server run on 4646 port")
})
