
const fs=require("fs")

const getTickets=()=>{
    let data=fs.readFileSync("db.json","utf-8")
    return JSON.parse(data)
}

const addTickets=(data)=>{
    fs.writeFileSync("db.json",JSON.stringify(data))
}

module.exports={
    getTickets,
    addTickets
}