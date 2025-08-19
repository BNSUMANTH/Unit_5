let express = require("express")
const dbRouter = require("./routes/dbRoutes")
let app = express()
app.use(express.json())



app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working"})
})
// all db routes
app.use("/db",dbRouter)

app.use((req,res)=>{
    res.status(404).json({message:"404 , Route is not found"})
})

app.listen(3000,()=>{
    console.log("Server is running on the 3000 port")
})