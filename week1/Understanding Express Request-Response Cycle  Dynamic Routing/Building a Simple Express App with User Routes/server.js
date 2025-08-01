const express=require("express");

const app=express();

const users=[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Doe", "email": "jane@example.com" },
  { "id": 3, "name": "Bob Smith", "email": "bob@example.com" }
];

app.get("/user/get",(req,res)=>{
    res.status(200).json(users[0]);
})

app.get("/user/list",(req,res)=>{
    res.status(200).json(users);
})

app.use((req,res)=>{
    res.status(404).json({"error":"404 Not Found"})
})

app.listen(3000,()=>{
    console.log("server is stard at 3000 port....");
})