const mongoose = require("mongoose");


const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
    }
});

const TagModel = mongoose.model("Tag", TagSchema);
module.exports = TagModel;