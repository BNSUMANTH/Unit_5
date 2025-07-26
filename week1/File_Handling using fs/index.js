const {readFileData,appendFileData}=require("./fileOperations");
 console.log("Initial File Content")
 readFileData();
 appendFileData();
 console.log("\nUpdated File Content");
 readFileData();