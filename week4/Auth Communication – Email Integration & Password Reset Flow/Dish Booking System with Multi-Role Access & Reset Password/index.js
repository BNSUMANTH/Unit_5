const express=require('express')
const Db = require('./config/db')
const authrouter = require('./routes/auth.route')

const app=express()

app.use(express.json())

Db()

app.use("/auth",authrouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})