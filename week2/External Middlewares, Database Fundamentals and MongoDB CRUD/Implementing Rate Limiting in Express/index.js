const express=require("express");
const apiRouter = require("./routes/api.routes");

const app=express();
app.use(express.json());


app.use("/api",apiRouter);
app.use("",(req,res)=>{
    res.status(404).json({error:"404 Not Found"})
})

app.listen(3000,()=>{
    console.log("server is started at 3000 port")
})