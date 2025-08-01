const {getBook,addBooks}=require('../model/model.books')
const getBooks=(req,res)=>{
    const data=getBook()
    res.status(200).send(data)
}

const addBook=(req,res)=>{
    const data=getBook()
    data.books.push(req.body)
    addBooks(data)
    res.status(200).send({message:"book added sucessfully"})
}

const updateBook=(req,res)=>{
    const data=getBook()
    const {id}=req.params
    const upbook=req.body
    const index=data.books.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    data.books[index]={...data.books[index],...upbook}
    addBooks(data)
    res.status(200).send({message:"book updated sucessfully"})
}

const deleteBook=(req,res)=>{
    const data=getBook()
    const {id}=req.params
    const index=data.books.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    data.books.splice(index,1)
    addBooks(data)
    res.status(200).send({message:"book deleted sucessfully"})
}

module.exports={
    getBooks,
    addBook,
    updateBook,
    deleteBook
}