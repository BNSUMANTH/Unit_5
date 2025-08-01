const express=require('express')

const {getBooks,addBook,updateBook,deleteBook}=require('../controllers/controller.admin')

const adminRouter=express.Router()

adminRouter.get("/books",getBooks)

adminRouter.post("/addbook",addBook)

adminRouter.patch("/updatebook/:id",updateBook)

adminRouter.delete("/deletebook/:id",deleteBook)

module.exports=adminRouter