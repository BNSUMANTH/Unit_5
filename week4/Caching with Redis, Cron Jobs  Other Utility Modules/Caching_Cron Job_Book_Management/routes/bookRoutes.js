let express = require ('express');
const tokenValidMiddleware = require ('../middlewares/tokenValidMW');
const BookModel = require('../models/bookModel');
const redis = require('../configs/redis');
let bookRouter = express.Router ();

// add book
bookRouter.post ('/add-book', tokenValidMiddleware, async (req, res) => {
  try {
    let {bookname,description} = req.body 
    // console.log(bookname)
    let userId =  req.user 
    // console.log(userId)
    let newBook = await BookModel.create({bookname,description,addedBy:userId})
    await redis.del(userId) // deleting the specific user books from the redis storage
    res.status(201).json({message:"Book added",newBook})
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});
// get all books for a specific user 
bookRouter.get("/all-books",tokenValidMiddleware,async(req,res)=>{
    try {
        let userId = req.user
        let cachedData = await redis.get(userId)
        if(!cachedData){
            console.log("inside if block")
            // need to generate data from db and store it into the redis and provide response 
            let allBooks = await BookModel.find({addedBy:userId}) 
            if(allBooks.length==0){
                return res.status(400).json({message:"No Books are found for this user"})
            }
            // books found in db 
            console.log("inside if block 2")
            await redis.set(userId,JSON.stringify(allBooks),'EX', 300)
            console.log("inside if block 3")
            res.status(200).json({message:"All User Books from DB",Books:allBooks})
        }
        cachedData = JSON.parse(cachedData)
        res.status(200).json({message:"All User Books from redis",Books:cachedData})
    } catch (error) {
        res.status (500).json ({message: `Error: ${error.message}`});
    }
})

// update a book by id 
bookRouter.put("/update/:id",async(req,res)=>{
    try {
        let id = req.params.id
        let {description} = req.body 
        if(!description){
            return res.status(200).json({message:"Please provide valid details to update book"})
        }
        let book = await BookModel.findById(id)
        if(!book){
            return res.status(404).json({message:"Book is not found to update"})
        }
        book.description = description
        await book.save()
        await redis.del(book.addedBy)
        res.status(200).json({message:"Book Updated"})
    } catch (error) {
        res.status (500).json ({message: `Error: ${error.message}`});
    }
})
// delete book by id
bookRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id = req.params.id 
        let book = await BookModel.findByIdAndDelete(id)
        if(!book){
            return res.status(404).json({message:"Book is not found to delete"})
        }
        await redis.del(book.addedBy)
        res.status(200).json({message:"Book deleted",book})
    } catch (error) {
        res.status (500).json ({message: `Error: ${error.message}`});
    }
})
// add bulk of books 
bookRouter.post("/bulk",tokenValidMiddleware,async(req,res)=>{

    try {
        let arrOfBooks = req.body ;
        let userId = req.user ;
        // console.log(userId)
        // console.log(arrOfBooks)
        res.status(200).json({message:"Books will be added later."})
    } catch (error) {
        res.status (500).json ({message: `Error: ${error.message}`});
    }
})
module.exports = bookRouter;
