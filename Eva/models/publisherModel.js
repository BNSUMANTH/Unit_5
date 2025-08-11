const mongoose=require("mongoose");

const publisherSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    location:String,
    yearEstablished:{type:Number,min:1950}
})

const publisherMOdel= mongoose.model("publisher",publisherSchema);

module.exports=publisherMOdel;
