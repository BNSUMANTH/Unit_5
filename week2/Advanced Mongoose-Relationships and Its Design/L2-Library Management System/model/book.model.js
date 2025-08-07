const mongoose= require('mongoose')

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength: 3
    },
    author:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["available", "borrowed"]
    },
    borrowers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"libray-member"
        }
    ],
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

const Book=mongoose.model("library-book",bookSchema)

module.exports=Book

// Example JSON for the book schema:

/*
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "status": "available",
  "borrowers": [
    "60d21b4667d0d8992e610c85",
    "60d21b4967d0d8992e610c86"
  ],
  "createdAt": "2024-06-10T12:00:00.000Z"
}
*/
