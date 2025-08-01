const express=require("express")

const adminRouter=express.Router()

adminRouter.get("/employee",getEmployee)

adminRouter.post("/addemployee",addEmployee)

adminRouter.put("/updateemployee/:id",updateEmployee)

adminRouter.delete("/deleteemployee/:id",deleteEmployee)

module.exports=adminRouter