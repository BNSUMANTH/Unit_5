const express = require("express");
const connectDB = require("./config/db");
const bookRouter=require('./routes/book.route')

const app = express();

connectDB();

app.use(express.json());

app.use("/", bookRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


