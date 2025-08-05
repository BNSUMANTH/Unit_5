
const mongoose=require("mongoose")

const db=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/assignment")
        console.log("Db connected succcessfully")
    }
    catch(err){
        console.log("Db not connected...")
    }
}


module.exports=db