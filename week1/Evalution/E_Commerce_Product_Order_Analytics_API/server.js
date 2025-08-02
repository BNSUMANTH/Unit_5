
const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");

connectToDB()

const app = express();

app.use(express.json());

app.use("/users", UserRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);
app.listen(3000, () => {
    console.log("Server Started....")
})