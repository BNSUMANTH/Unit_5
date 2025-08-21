const express=require("express");
const { login, singup } = require("../controllers/auth.controllers");
const AuthRouter=express.Router();



AuthRouter.post("/register",login);

AuthRouter.post("/login",singup);

module.exports=AuthRouter;