const express=require("express")

const hrRouter=express.Router()

hrRouter.get("/employee",getEmployee)

hrRouter.put("/updateemployee/:id",updateEmployee)

hrRouter.delete("/deleteemployee/:id",deleteEmployee)

module.exports=hrRouter