

const mongoose = require("mongoose");

const connectToDB = async () => {
   try {
      await mongoose.connect("mongodb://127.0.0.1:27017/E_commerce")
      console.log("Connected To DB")
   } catch (err) {
      console.log("Err in connecting DB")
      console.log(err)
   }
}

module.exports = connectToDB;