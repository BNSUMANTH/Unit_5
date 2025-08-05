

const library=require('../model/library.model')

const getbook=async(req,res)=>{
    try{
        let data=await library.find()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send({msg:"faild to featch"})
    }
}

const addbook=async(req,res)=>{
    try{
        let data=req.body
        await library.insertOne(data)
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send({msg:"Error"})
    }

}

const updatebook=async(req,res)=>{
    const {id}=req.params
    const data=req.body
    try{
        let book=await library.findByIdAndUpdate(id,data,{new:true})
        res.status(200).json(book)
    }
    catch(err){
        res.status(400).send({msg:"Error"})
    }
}

const deletebook=async(req,res)=>{
    const {id}=req.params
    try{
        let book=await library.findByIdAndDelete(id)
        res.status(200).json(book)
    }
    catch(err){
        res.status(400).send({msg:"Error"})
    }
}

module.exports={getbook,addbook,updatebook,deletebook}
