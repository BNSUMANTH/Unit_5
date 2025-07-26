// const {fun,sum}=require("./help");
// fun(); 
// console.log(sum(2,4))

const fs =require("fs");
// fs.readFile("./data.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log("error",err);
//     }
//     if(data){
//         console.log("data",data);
//     }
// })
// console.log("end");
let str="abcdefgh"

fs.writeFile("./data1.txt",str,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("data written")
})