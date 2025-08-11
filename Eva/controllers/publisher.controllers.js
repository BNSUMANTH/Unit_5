const publisherMOdel = require("../models/publisherModel")



const addPublish = async(req,res)=>{
    try {
        let publish = await publisherMOdel.create(req.body)
        res.status(201).json({msg:"Publish Added",publish})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const allPublishers = async(req,res)=>{
    try {
        let publish = await publisherMOdel.find({})
        res.status(201).json({msg:" All Publishers",publish})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


const publishersById = async(req,res)=>{
    let {publisherId} = req.params
    try {
        let publish = await publisherMOdel.findById(publisherId)
        res.status(200).json({msg:"Publishers Details By Id",publisherDetails:publish})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const updatePublishers = async(req,res)=>{
    let {publisherId} = req.params
    try {
        let publish = await publisherMOdel.findById(publisherId)
        if(!publish){
            res.status(404).json({msg:"Publisher Not found"})
        }
        else{
            await publisherMOdel.findByIdAndUpdate(publisherId,req.body)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deletePublishers = async(req,res)=>{
    let {publisherId} = req.params
    try {
        let publish = await publisherMOdel.findById(publisherId)
        if(!publish){
            res.status(404).json({msg:"Publisher Not found"})
        }
        else{
            await publisherMOdel.findByIdAndDelete(publisherId)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


module.exports = {addPublish,allPublishers,publishersById,updatePublishers,deletePublishers}