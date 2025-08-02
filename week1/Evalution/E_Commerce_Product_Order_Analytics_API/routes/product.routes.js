const express = require("express");
const productModel = require("../models/product.model");


const productRouter = express.Router();

productRouter.get("/", async (req, res) => {

    try {
        let products = await productModel.find({});
        res.status(200).json({ msg: "product List", products })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong please try again later" })
    }
})



productRouter.post("/add-product", async (req, res) => {

    let product = await productModel.create(req.body)
    res.status(201).json({ msg: "product added", product });
})

productRouter.patch("/update-product/:productId", async (req, res) => {

    const { productId } = req.params;
    let product = await productModel.findById(productId);
    if (!product) {
        res.status(404).json({ msg: "product Not Found" })
    } else {

        await productModel.findByIdAndUpdate(productId, req.body)
        res.status(201).json({ msg: "product Updated" })
    }
})


productRouter.delete("/delete-product/:productId", async (req, res) => {

    try {
        const { productId } = req.params;
        let product = await productModel.findById(productId);
        if (!product) {
            res.status(404).json({ msg: "product Not Found" })
        } else {

            await productModel.findByIdAndDelete(productId)
            res.status(200).json({ msg: "product Deleted" })
        }
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})


module.exports = productRouter;