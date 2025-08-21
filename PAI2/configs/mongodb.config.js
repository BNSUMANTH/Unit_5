const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI=process.env.MONGO_URI;
const connectTODB= async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to db...");
    } catch (error) {
        console.log("failed to connect to db....",error);

    }
}

module.exports=connectTODB;