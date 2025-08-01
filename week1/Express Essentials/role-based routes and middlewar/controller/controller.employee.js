const {GetEmployee,AddEmployee}=require("../model/emploree.model")

const getEmployee=(req,res)=>{
    const employees=GetEmployee()
    res.json(employees)
}

const addEmployee=(req,res)=>{
    const employee=req.body
    const employees=GetEmployee()
    const newemployee={...employee,id:employees.length+1}
    employees.push(newemployee)
    AddEmployee(employees)
    res.json({message:"Employee added successfully"})
}

const updateEmployee=(req,res)=>{
    const id=req.params.id
    const employee=req.body
    const employees=GetEmployee()
    const index=employees.findIndex(employee=>employee.id==id)
    if(index!==-1){
        employees[index]=employee
    }   
    AddEmployee(employees)
    res.json({message:"Employee updated successfully"})
}

const deleteEmployee=(req,res)=>{
    const id=req.params.id
    const employees=GetEmployee()
    const index=employees.findIndex(employee=>employee.id==id)
    if(index!==-1){
        employees.splice(index,1)
    }
    AddEmployee(employees)
    res.json({message:"Employee deleted successfully"})
}

module.exports={getEmployee,addEmployee,updateEmployee,deleteEmployee}
