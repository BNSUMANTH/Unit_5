const express=require("express");

const app=express();

app.use(express.json())
app.post("/get",(req,res)=>{
    console.log(req.body);
    res.send("this is get method");
})

app.put("/put-data",(req,res)=>{
    res.send("data updated...")
});

app.delete("/delete-data",(req,res)=>{
    res.send("data-deleted....");
})

app.listen(3000,()=>{
    console.log("server is started...");
})