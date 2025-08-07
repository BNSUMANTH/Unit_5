const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    rentedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "many-to-many-User",
        }
    ]
});

const Book = mongoose.model("many-to-many-Book", bookSchema);

module.exports = Book;