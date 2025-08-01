const {getTickets,addTickets}=require("../models/model.ticket")

const getTicket=(req,res)=>{
    let ticket=getTickets()
    res.status(200).json({ticket})
}

const addTicket=(req,res)=>{
    let ticket=getTickets()
    let data=req.body;
    ticket.tickets.push((ticket.tickets.length>0)?{...data,id:ticket.tickets[ticket.tickets.length-1].id+1,status:"pending"}:{...data,id:1,status:"pending"})
    addTickets(ticket)
    res.status(200).send({message:"ticket add successfully"})
}

const updateTicket=(req,res)=>{
    let {id}=req.params;
    let data=req.body;
    let ticket=getTickets()
    let index=ticket.tickets.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    ticket.tickets[index]={...ticket.tickets[index],...data}
    addTickets(ticket)
    res.status(200).send({message:"updata sucessfully"})
}

const deleteTicket=(req,res)=>{
    let {id}=req.params
    let data=getTickets()  
    let index=data.tickets.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    data.tickets.splice(index,1)
    addTickets(data)
    res.status(200).send({message:"delete sucessfully"})

    
}

const updateStatus=(req,res)=>{
    let {id}=req.params;
    let data=getTickets()
    let index=data.tickets.findIndex((e)=>e.id==id)
    if(index==-1){
        return res.status(404).send("404 not found")
    }
    data.tickets[index].status=req.body.status
    addTickets(data)
    res.status(200).send({message:"status updated sucessfully"})
}

module.exports={
    getTicket,
    addTicket,
    updateTicket,
    deleteTicket,
    updateStatus
 
}