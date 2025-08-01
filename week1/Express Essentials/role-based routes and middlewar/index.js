const express=require("express")

const app=express()


app.use(express.json())

app.use("/admin",adminRouter)

app.use("/Hr",hrRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})





