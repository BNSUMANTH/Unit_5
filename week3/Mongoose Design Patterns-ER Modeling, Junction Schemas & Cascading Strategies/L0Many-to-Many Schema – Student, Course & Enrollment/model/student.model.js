const mongoose=require('mongoose')

const studentScheema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isactive:{
        type:Boolean,
        default:true
    }
})

const Student=mongoose.model("many-to-many-student",studentScheema)

module.exports=Student
