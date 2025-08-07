const express=require("express")
const db=require("./config/db")

const libraryRouter=require("./routes/library.routes")
const app=express();

db();

app.use(express.json())

app.use("/",libraryRouter)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})