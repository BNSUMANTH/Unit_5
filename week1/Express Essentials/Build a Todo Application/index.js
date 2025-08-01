const express = require("express");
const router = require("./routes/router.todo");

const app = express();

app.use(express.json());

app.use("/todo",router);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});