const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profiles: [{
        profileName: { type: String, enum: ["fb", "twitter", "github", "instagram"], requires: true },
        url: { type: String, required: true }
    }]
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;