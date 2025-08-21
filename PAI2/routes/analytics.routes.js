const express=require("express");
const { topActiveUsers, mostUpvotedPosts } = require("../controllers/analytics.controllers");
const moderatorMiddleware = require("../middlewares/moderator.middlewares");
const analyticsRouter=express.Router();


analyticsRouter.get("/stats/topActiveUsers",moderatorMiddleware,topActiveUsers);
analyticsRouter.get("/stats/mostUpvotedPosts",moderatorMiddleware,mostUpvotedPosts);

module.exports=analyticsRouter;