const express=require("express");
const { comments, upvotes } = require("../controllers/interaction.controllers");
const authmiddleware = require("../middlewares/auth.middlewares");
const interactionRouter=express.Router();


interactionRouter.post("/comments",authmiddleware,comments);

interactionRouter.post("/upvote",upvotes);

module.exports=interactionRouter;