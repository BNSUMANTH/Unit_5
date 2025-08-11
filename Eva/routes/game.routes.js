const express=require("express");
const { addgame, allgames, gameById, updategame, deletegames } = require("../controllers/geme.controllers");

const gameRoute=express.Router();

gameRoute.post("/",addgame);

gameRoute.get("/",allgames);

gameRoute.get("/:id",gameById);

gameRoute.put("/:id",updategame);

gameRoute.delete("/:id",deletegames);


module.exports=gameRoute;