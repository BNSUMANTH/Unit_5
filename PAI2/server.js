const express = require("express");
const connectTODB = require("./configs/mongodb.config");
const postRouter = require("./routes/post.routes");
const interactionRouter = require("./routes/interaction.routes");
const AuthRouter = require("./routes/auth.routes");
const analyticsRouter = require("./routes/analytics.routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000

const app = express();
connectTODB();
app.use(express.json());


app.use("/api/auth", AuthRouter);
app.use("/api/posts", postRouter);
app.use("/api/posts/:postId", interactionRouter);
app.use("/api/analytics",analyticsRouter);




app.get("/test", (req, res) => {
    res.status(200).json({ mes: "route is working...." })
})

app.use((req, res) => {
    res.status(404).json({ msg: "404 not found" })
});
app.listen(PORT, () => {
    console.log(`server is running in  Port`);
});

