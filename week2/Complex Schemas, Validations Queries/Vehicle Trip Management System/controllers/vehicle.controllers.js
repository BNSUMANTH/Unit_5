const Vehicle = require("../model/vehicle.model");

const addVehicle = async (req, res) => {
    const vehicle = req.body;
    const newVehicle = await Vehicle.create(vehicle);
    res.status(201).json(newVehicle);
}

const addTrip = async (req, res) => {
    const {id} = req.params;
    const trip = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(id,{$push:{trips:trip}},{new:true});
    res.status(200).json(vehicle);
}

const getVehicle = async (req, res) => {
    const vehicles = await Vehicle.find({$gte:{distance:200}});
    res.status(200).json(vehicles);
}

const deleteTrip = async (req, res) => {
    const {id} = req.params;
    const trip = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(id,{$pull:{trips:trip}},{new:true});
    res.status(200).json(vehicle);
}

const updateTrip = async (req, res) => {
    const {id} = req.params;
    const trip = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(id,{$set:{trips:trip}},{new:true});
    res.status(200).json(vehicle);
}

const getTrip = async (req, res) => {
    const {id} = req.params;
    const vehicle = await Vehicle.findById(id);
    res.status(200).json(vehicle);
}


module.exports = {addVehicle,addTrip,getVehicle,deleteTrip,updateTrip,getTrip};


