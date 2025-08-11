const mongoose=require("mongoose");

const gameSchema=new mongoose.Schema({
    title:{type:String,requird:true},
    genre:{type:String,enum:["RPG","Action","Adventure","Strategy","Sports"]},
    releaseDate:Date,
    publisher:{type :mongoose.Schema.Types.ObjectId,ref:"publisher"}
})

const gameMOdel= mongoose.model("publisher",gameSchema);

module.exports=gameMOdel;
