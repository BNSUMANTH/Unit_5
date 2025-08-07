const express = require("express");
const ConnectToDB = require("./config/DBconnect");
const taskRoutes = require("./routes/task.routes");
ConnectToDB();
const app = express();

app.use(express.json());


app.use("/task",taskRoutes);

app.listen(3000, () => {
    console.log("server is started at port 3000....");
})

