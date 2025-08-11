const express=require("express");
const connectToDB = require("./configs/mongodb.config");
const publisherRoute = require("./routes/publisher.routes");
const gameRoute = require("./routes/game.routes");

const app=express();

app.use(express.json());

connectToDB();

app.use("/api/publishers",publisherRoute);
app.use("/api/games",gameRoute);

app.listen(3000,()=>{
    console.log("Server is Started at 3000");
})