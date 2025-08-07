const Book = require("../model/book.model");
const User = require("../model/user.model");

const adduser = async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
};

const addbook = async (req, res) => {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json({ message: "Book created successfully", book });
};

const rentbook = async (req, res) => {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);
    console.log(user,book)
    book.rentedBy.push(user);
    user.rentedBooks.push(book);
    await book.save();
    await user.save();
    res.status(200).json({ message: "Book rented successfully", book });
};

const returnbook = async (req, res) => {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);
    book.rentedBy.pull(user);
    user.rentedBooks.pull(book);
    await book.save();
    await user.save();
    res.status(200).json({ message: "Book returned successfully", book });
};

const getbookrenters = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate("rentedBy");
    res.status(200).json({ message: "Book renters", book });
};


const getuserrental = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("rentedBooks");
    res.status(200).json({ message: "User rental", user });
};

const updatebook = async (req, res) => {
    const { id } = req.params;         
    const { title, author, genre } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author, genre }, { new: true });
    res.status(200).json({ message: "Book updated successfully", book });
};

const deletebook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
};          

module.exports = {
    adduser,
    addbook,
    rentbook,
    returnbook,
    getbookrenters,
    getuserrental,
    updatebook,
    deletebook
};

