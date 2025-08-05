const mangoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mangoose.connect("mongodb://127.0.0.1:27017/");
        console.log("connected To DB");

    } catch (err) {
        console.log("error in connection ");
        console.log(err);
    }
}

connectToDb();