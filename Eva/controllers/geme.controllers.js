
const gameMOdel = require("../models/gameModel")



const addgame = async(req,res)=>{
    try {
        let game = await gameMOdel.create(req.body)
        res.status(201).json({msg:"game Added",gmae})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const allgames = async(req,res)=>{
    try {
        let game = await gameMOdel.find({})
        res.status(201).json({msg:" All games",game})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


const gameById = async(req,res)=>{
    let {gameId} = req.params
    try {
        let game = await gameMOdel.findById(gameId)
        res.status(200).json({msg:"game Details By Id",gameDetails:game})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const updategame = async(req,res)=>{
    let {gameId} = req.params
    try {
        let game = await gameMOdel.findById(gameId)
        if(!game){
            res.status(404).json({msg:"game Not found"})
        }
        else{
            await gameMOdel.findByIdAndUpdate(gameId,req.body)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deletegames = async(req,res)=>{
    let {gameId} = req.params
    try {
        let game = await gameMOdel.findById(gameId)
        if(!game){
            res.status(404).json({msg:"game Not found"})
        }
        else{
            await gameMOdel.findByIdAndDelete(gameId)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


module.exports = {allgames,addgame,deletegames,updategame,gameById}