const express=require('express')
const db=require('./config/db')
const libraryrouter=require('./routes/library.routes')


const app=express()

db();

app.use(express.json())

app.use('/library',libraryrouter)



app.listen(3000,()=>{
    console.log("sserver running on port no 3000")
})