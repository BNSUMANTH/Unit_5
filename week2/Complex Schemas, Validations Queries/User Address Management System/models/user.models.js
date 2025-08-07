const mongoose=require("mongoose");


const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    address:[{
        street:String,
        city:String,
        state:String,
        country:{type:String, default:"india"}
    }]
})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;