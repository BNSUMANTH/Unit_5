const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    ProductId: Number,
    totalAmount: Number
  }
)

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;