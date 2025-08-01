const express = require('express');
const taskRouter=require("./router/router.task")
const app = express()

app.use(express.json());

app.use("/tasks", taskRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



