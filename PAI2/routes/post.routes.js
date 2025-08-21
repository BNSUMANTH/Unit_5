const express=require("express");
const { posts, getPosts, getPostById, deletePost } = require("../controllers/post.controllers");
const moderatorMiddleware = require("../middlewares/moderator.middlewares");
const authmiddleware = require("../middlewares/auth.middlewares");
const postRouter=express.Router();

postRouter.post("/",authmiddleware,getPosts);

postRouter.get("/",posts);

postRouter.get("/:postId",getPostById);

postRouter.delete("/:postId",moderatorMiddleware,deletePost);


module.exports=postRouter;