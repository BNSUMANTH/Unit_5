const express=require("express");
const db = require("./config/Dbconnect");
const userRouter = require("./routes/user.routes");

const app=express();
 
db();


app.use(express.json());

app.use("/users",userRouter);
app.listen(3000,()=>{
    console.log("server is started at 3000 port");
})