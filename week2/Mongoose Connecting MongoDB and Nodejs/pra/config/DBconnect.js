const mongoose = require("mongoose");

const ConnectToDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Pra_Task_Mangemnt");
        console.log("connected to db...");
    } catch (error) {
        console.log("error in connecting db");
        console.log(error)
    }
}

module.exports = ConnectToDB;