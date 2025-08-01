const fs=require("fs")

const GetEmployee=()=>{
    const employee=fs.readFileSync("employee.json","utf-8")
    return JSON.parse(employee)
}

const AddEmployee=(employee)=>{

    fs.writeFileSync("employee.json",JSON.stringify(employee,null,2))
}

module.exports={GetEmployee,AddEmployee}