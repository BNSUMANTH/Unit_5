const express=require("express");
const {readFileData,sysdetails}=require("./read");

// console.log(Readfile);
const app=express();
app.listen(3000,()=>{
    console.log("port 3000 started..... ")
})

app.get("/readfile",(req,res)=>{
    res.send(readFileData());
})

app.get("/test",(req,res)=>{
    res.send("Test route is working!");
})
app.get("/systemdetails",(req,res)=>{
    res.send(sysdetails());
})


