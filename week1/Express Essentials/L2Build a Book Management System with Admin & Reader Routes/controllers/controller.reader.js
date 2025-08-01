const borrowBook=(req,res)=>{
    const data=getBook()
    const {id}=req.params
    const {borrower}=req.body
    const index=data.books.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    data.books[index].borrowedBy=borrower
    data.books[index].borrowedDate=new Date().toISOString()
    data.books[index].status="borrowed"
    addBooks(data)
    res.status(200).send({message:"book borrowed sucessfully"})
}

const returnBook=(req,res)=>{
    const data=getBook()
    const {id}=req.params
    const index=data.books.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    data.books[index].borrower=null
    data.books[index].status="available"
}

module.exports={
    borrowBook,
    returnBook
}