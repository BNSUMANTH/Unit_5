const adminRouter=require('./router/router.admin')
const readerRouter=require('./router/router.reader')
const express=require('express')

const app=express()

app.use(express.json())

app.use("/admin",adminRouter)

app.use("/reader",readerRouter)


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})





