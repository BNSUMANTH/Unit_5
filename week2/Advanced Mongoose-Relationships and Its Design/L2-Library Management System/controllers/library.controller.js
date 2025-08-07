
const Book =require('../model/book.model')
const User=require('../model/user.model')

const addbook=async(req,res)=>{
    try{
        let book=req.body
        let re=await Book.create(book)
        res.status(200).json({msg:"succesfully added",re})
    }
    catch(err){
        res.status(400).send({mes:"error"})
    }
}

const addmember=async(req,res)=>{
    try{
        let member=req.body
        let me=await User.create(member)
        res.status(200).json({msg:"succesfully added",me})
    }
    catch(err){
        res.status(400).send({msg:"error to add member"})
    }
}

const borrowBook=async(res,req)=>{
    try{
        let {bookid,userid}=req.body
        let book = await Book.findByIdAndUpdate(
            bookid,
            { $addToSet: { borrowers: userid }, $set: { status: "borrowed" } },
            { new: true }
        );
        let member = await User.findByIdAndUpdate(userid,{$set:{borrowedBooks:bookid}});
        res.status(200).send({msg:"enjoy reading"})
    }
    catch(err){
        res.status(400).send({msg:"Error"})
    }
}

const returnbook=async(req,res)=>{
    let {bookid,userid}=req.body
    try{
        let {bookid,userid}=req.body

        await Book.findByIdAndUpdate(
            bookid,
            { $pull: { borrowers: userid }, $set: { status: "available" } }
        );

        await User.findByIdAndUpdate(
            userid,
            { $pull: { borrowedBooks: bookid } }
        );
        
        res.status(200).send({msg:"Thanks returning"})
    }
    catch(err){
        res.status(400).send({msg:"Error"})
    }
}

const getborrowedbookbyid=async(req,res)=>{
    try{
        let id=req.params.id
        let user=await User.findById(id).populate("borrowedBooks")
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).send({msg:"error"})
    }
}

const getbookborrowersbyid=async(req,res)=>{
    try{
        let id=req.params.id
        let book=await Book.findById(id).populate("borrowers")
        res.status(200).json(book)
    }
    catch(err){
        res.status(400).send({msg:"error"})
    }
}

const updatebook=async(req,res)=>{
    try{
        let id=req.params.id
        let {title,author}=req.query
        let up=await Book.findByIdAndUpdate(id,{title,author},{new:true})
        res.status(200).json(up)
    }
    catch(err){
        res.status(200).send({msg:"error"})
    }
}

const deletebook=async(req,res)=>{
    try{
        let id=req.params.id
        let de=await Book.deleteOne(id)
        res.status(200).json(up)
    }
    catch(err){
        res.status(200).send({msg:"error"})
    }

}

module.exports={
    addbook,
    addmember,
    borrowBook,
    returnbook,
    getbookborrowersbyid,
    getborrowedbookbyid,
    updatebook,
    deletebook
}

