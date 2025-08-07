const express=require('express')

const{addbook,addmember,borrowBook,returnbook,getborrowedbookbyid,getbookborrowersbyid,updatebook,deletebook}=require('../controllers/library.controller')

const libraryRouter=express.Router()


libraryRouter.post('/add-book',addbook)

libraryRouter.post('add-member',addmember)

libraryRouter.post('/borrow-book',borrowBook)

libraryRouter.post('/return-book',returnbook)

libraryRouter.get('/member-borrowed-books/:memberId',getborrowedbookbyid)

libraryRouter.get('/book-borrower/:bookid',getbookborrowersbyid)

libraryRouter.put('/update-book/:bookid',updatebook)

libraryRouter.delete('/delete-book/:bookid',deletebook)


module.exports=libraryRouter