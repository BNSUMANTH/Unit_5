const connectDB = require("./config/db");
const express = require("express");
const userRouter = require("./routes/user.routes");



const app = express();


connectDB();


app.use(express.json());

app.use("/", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});






