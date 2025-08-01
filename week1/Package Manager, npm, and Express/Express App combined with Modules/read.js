const fs=require("fs");
const os=require("node:os");

function readFileData(){
    try{
    const data=fs.readFileSync("./data.txt","utf-8");
    return data;
    }catch(err){
        return err;
    }
}
function formatBytes(bytes) {
  return (bytes/(1024**3)).toFixed(2)+" GB";
}

function sysdetails(){
    let cpus=os.cpus();
    let d={"platform":os.type(),
        "totalMemory":formatBytes(os.totalmem()),
        "freeMemory":formatBytes(os.freemem()),
        "cpuModel":cpus[0].model
    };
    return d;
}


module.exports={readFileData,sysdetails};