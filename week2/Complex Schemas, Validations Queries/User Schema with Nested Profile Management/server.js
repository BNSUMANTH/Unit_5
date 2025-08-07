const express=require("express");
const userRouter = require("./routes/user.routes");
const db = require("./config/dbconnect");
const app=express();

app.use(express.json());

db()
app.use("/user",userRouter);


app.listen(3000,()=>{
    console.log("server is started at 3000 port....");
});

