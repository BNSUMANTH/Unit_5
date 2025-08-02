const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Product_name: String,
    category: String,
    price: Number,
    inStock: Boolean,
    location: String
  }
)

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;