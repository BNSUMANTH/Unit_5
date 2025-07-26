
const fs=require("fs");

function readFileData(){
    try{
    const data=fs.readFileSync("./data.txt","utf-8");
    console.log(data);
    }catch(err){
        console.log(err);
    }
}

function appendFileData(){
    try {
        fs.appendFileSync("./data.txt","This is Appended data\n");
        console.log("Appending data");
    } catch (error) {
        console.log(error)
    }
}

module.exports={readFileData,appendFileData};