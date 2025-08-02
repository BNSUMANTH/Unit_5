const express = require("express");
const orderModel = require("../models/order.model");


const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {

    try {
        let orders = await orderModel.find({});
        res.status(200).json({ msg: "order List", orders })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong please try again later" })
    }
})



orderRouter.post("/add-order", async (req, res) => {

    let order = await orderModel.create(req.body)
    res.status(201).json({ msg: "order added", order });
})

orderRouter.patch("/update-order/:orderId", async (req, res) => {

    const { orderId } = req.params;
    let order = await orderModel.findById(orderId);
    if (!order) {
        res.status(404).json({ msg: "order Not Found" })
    } else {

        await orderModel.findByIdAndUpdate(orderId, req.body)
        res.status(201).json({ msg: "order Updated" })
    }
})


orderRouter.delete("/delete-order/:orderId", async (req, res) => {

    try {
        const { orderId } = req.params;
        let order = await orderModel.findById(orderId);
        if (!order) {
            res.status(404).json({ msg: "order Not Found" })
        } else {

            await orderModel.findByIdAndDelete(orderId)
            res.status(200).json({ msg: "order Deleted" })
        }
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})


module.exports = orderRouter;