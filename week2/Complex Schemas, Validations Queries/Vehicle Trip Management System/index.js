const express = require("express");
const connectDB = require("./config/db");
const vehicleRouter = require("./routes/vehicle.routes");

connectDB();

const app = express();

app.use(express.json());

app.use("/vehicle", vehicleRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})





