const express = require("express");
const {addVehicle,addTrip,getVehicle,deleteTrip,updateTrip,getTrip} = require("../controllers/vehicle.controllers");


const vehicleRouter = express.Router();

vehicleRouter.post("add-vehicle",addVehicle);

vehicleRouter.put("add-trip/:id",addTrip);

vehicleRouter.put("update-trip/:id",updateTrip);

vehicleRouter.put("delete-trip/:id",deleteTrip);

vehicleRouter.get("get-vehicle",getVehicle);

vehicleRouter.delete("get-trip/:id",getTrip);


modul.exports = vehicleRouter;
