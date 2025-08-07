const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "library-book"
        }
    ]
});

const User = mongoose.model("library-member", userSchema);

module.exports = User;
