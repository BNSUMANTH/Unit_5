
const express=require('express')

const router=require('./routes/router.ticket')
 
const app=express()

app.use(express.json())

app.use("/tickets",router)

app.listen(3000,()=>{
    console.log("server running on port 3000")
})