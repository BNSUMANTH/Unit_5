
const datavlidation=(req,res,next)=>{
    const data=req.body
    console.log(data.status,data.borrowerName,data.borrowDate,data.dueDate,data.returnDate,data.overdueFees )
    if( (!data.title) || (!data.author) || (!data.status) || (!data.borrowDate) || (!data.dueDate) || (!data.borrowerName) || (!data.returnDate) || (!data.overdueFees)){
        next()
    } 
    else{
        res.status(400).send({"msg":"invalid data"})
    }
}

module.exports=datavlidation
