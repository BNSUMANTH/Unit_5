const express= require('express')
const {register,login} = require('../controller/auth.controller')

const authrouter=express.Router()

authrouter.post("/register", register)

authrouter.post("/login", login)

authrouter.get("/forgotpassword", forgotPassword)

module.exports=authrouter

