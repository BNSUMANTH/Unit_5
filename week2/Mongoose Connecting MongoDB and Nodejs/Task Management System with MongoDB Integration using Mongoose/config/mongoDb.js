
const mongoose=require('mongoose')

const db=async()=>{
    try{
        let mongo= await mongoose.connect("mongodb://127.0.0.1:27017/assignment")
        console.log("DB connected...")
    }catch(err){
        console.log("ERROR")
    }
   
}
module.exports=db