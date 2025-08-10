const express=require('express')
const db= require('./config/db')
const router=require('./routes/lms.route')

db()
const app=express()

app.use(express.json())

app.use('/lms',router)

app.listen(3000,()=>{
    console.log("server running on port 3000")
})