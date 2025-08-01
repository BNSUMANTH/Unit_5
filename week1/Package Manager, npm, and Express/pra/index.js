// var isEven=require("is-even");

// console.log(isEven(0));
// console.log(isEven(1));
// console.log(isEven('3'));
// console.log(isEven(4));
// console.log(isEven(34))

const express= require("express");

const fs=require("fs")

const app=express();
// app.get("/home",(req,res)=>{
//     res.send("this home route")
// })
// app.get("/test",(req,res)=>{
//     res.send("this is test  route")
// })
app.get("/read",(req,res)=>{
    let data=fs.readFileSync("./data.txt","utf-8");
    res.send(data);
})
app.listen(3000,()=>{
    console.log("Server working on 3000 port");
})
// app.get("/contactus1",(req,res)=>{
//     res.send("this contactus1 route");
// })
