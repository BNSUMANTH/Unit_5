const mongoose=require('mongoose')

const  Db=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/assignment")
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("Database connection failed")
    }
}

module.exports=Db