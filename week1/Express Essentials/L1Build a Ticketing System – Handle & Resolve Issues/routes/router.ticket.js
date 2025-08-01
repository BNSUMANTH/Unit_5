const express = require('express')

const {getTicket,addTicket,updateTicket,deleteTicket,updateStatus}=require('../controllers/controller.tickets')
const {dataCheckMiddleware}=require('../middleware/dataCheckMiddleware.js')

const router= express.Router()

router.get('/gettickets',getTicket)

router.post("/addTickets",dataCheckMiddleware,addTicket)


router.put("/updateTickets/:id",updateTicket)

router.delete("/deleteTickets/:id",deleteTicket)

router.patch("/:id/status",updateStatus)

module.exports=router