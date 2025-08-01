const express=require("express");
const app = express();


app.get("/home",(req,res)=>{
    res.status(200).send("Welcome to Home Page");
})

app.get("/aboutus",(req,res)=>{
    res.status(200).json({"message":"Welcom to About Us"});
})

app.get("/contactus",(req,res)=>{
    res.status(200).json({"name":"sumanth",
        "mail":"sum@gmail.com"
    })
})

app.use((req,res)=>{
    res.status(404).json({"message":"404 not found"})
})
app.listen(3000,()=>{
    console.log("server is started at 3000 port....")
})