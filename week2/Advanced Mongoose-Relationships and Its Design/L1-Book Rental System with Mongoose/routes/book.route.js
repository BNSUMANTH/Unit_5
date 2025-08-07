const express = require("express");
const { adduser, addbook, rentbook, returnbook, getbookrenters, getuserrental, updatebook, deletebook } = require("../controller/book.controller");

const bookRouter = express.Router();

bookRouter.post("/add-user",adduser);

bookRouter.post("/add-book",addbook);

bookRouter.post("/rent-book",rentbook);

bookRouter.post("/return-book",returnbook);

bookRouter.get("/book-renters/:id",getbookrenters);

bookRouter.get("/user-rental/:id",getuserrental);

bookRouter.put("/update-book/:id",updatebook);

bookRouter.delete("/delete-book/:id",deletebook);




module.exports = bookRouter;