const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rentedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "many-to-many-Book",
        }
    ]
});

const User = mongoose.model("many-to-many-User", userSchema);

module.exports = User;