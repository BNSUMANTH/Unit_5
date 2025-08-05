

const express=require('express')
const {getbook,addbook,updatebook,deletebook}=require('../controller/library.controller')

const datavlidation=require('../middleware/library.middleware')

const libraryrouter=express.Router()

libraryrouter.get("/library",getbook)

libraryrouter.post("/addbook",datavlidation,addbook)

libraryrouter.patch("/updatebook/:id",updatebook)

libraryrouter.delete("/deletebook/:id",deletebook)

module.exports=libraryrouter