const mongoose=require('mongoose')

const db=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/assignment")
        console.log("db connected...")
    }catch(err){
        console.log("error",err)
    }
}

module.exports=db

/*
title:"power of subconscious mind  "
author:"joseph murphy"
status:"available"
borrowerName:"john doe"
borrowDate:2025-06-27
dueDate:2025-07-27
returnDate:2025-07-27
overdueFees:0
*/