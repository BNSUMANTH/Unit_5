let express = require("express")
const connectToDb = require("./configs/mongoDb")
const userRouter = require("./routes/userRoutes")
const bookRouter = require("./routes/bookRoutes")
let app = express()
app.use(express.json()) 
require("dotenv").config()
let port = process.env.port || 3000
connectToDb()

app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working"})
})

app.use("/user",userRouter)

app.use("/book",bookRouter)

app.use((req,res)=>{
    res.status(404).json({message:"404, Route is not found"})
})

app.listen(port,()=>{
    console.log(`Server is Running on the ${port} port`)
})
