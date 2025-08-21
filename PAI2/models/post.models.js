const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlenngth:5
    },
    content:{
        type:String,
        required:true,
        minlenngth:20
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
    }],
    upvotes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now(),
        }

    }]
});

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;