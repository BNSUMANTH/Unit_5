const mongoose=require("mongoose")

const db=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/assignment")
        console.log("connected db...")
    }
    catch(err){
        console.log("Error:",err)
    }
}

module.exports=db