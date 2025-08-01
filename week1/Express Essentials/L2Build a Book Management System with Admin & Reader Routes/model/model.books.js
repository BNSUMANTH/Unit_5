const fs=require('fs')

const getBook=()=>{
    const   data=fs.readFileSync('db.json','utf-8')
    return JSON.parse(data)
}

const addBooks=(data)=>{
    fs.writeFileSync('db.json',JSON.stringify(data,null,2))
}

module.exports={getBook,addBooks}