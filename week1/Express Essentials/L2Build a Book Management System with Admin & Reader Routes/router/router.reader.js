const express=require('express')    
const {getBooks}=require('../controllers/controller.admin')

const {borrowBook,returnBook}=require('../controllers/controller.reader')

const readerRouter=express.Router()

readerRouter.get("/books",getBooks)

readerRouter.post("/borrow/:id",borrowBook)

readerRouter.post("/return/:id",returnBook)

module.exports=readerRouter


