const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true,
    },
    socialMediaLinks: [
        {
            type: String,
            required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "one-to-one-User",
        required: true
    }
});

const Profile = mongoose.model("one-to-one-Profile", profileSchema);

module.exports = Profile;