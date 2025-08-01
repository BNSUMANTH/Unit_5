const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json())

app.post("/dishes", (req, res) => {
    let newDish = req.body;

    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let Dishes = data.Dishes;
    Dishes.push(newDish);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(200).json({ "mes": "course added" });

})
app.get("/dishes", (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let Dishes = data.Dishes;
    res.status(200).json(Dishes);
})

app.get("/dishes/:dishId", (req, res) => {
    let dishId = req.params.dishId;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let Dishes = data.Dishes;

    let index = Dishes.findIndex((ind) => ind.id == dishId);
    if (index == -1) {
        res.status(404).json({ "msg": "Dish Not Found" });
    }
    else {
        Dishes.forEach((ele, id) => {
            if (ele.id == dishId) {
                res.status(200).json({ msg: "dish details", dish: ele });
            }
        });
    }

})

app.put("/dishes/:dishId", (req, res) => {
    dishId = req.params.dishId;

    let UpdateDish = req.body;

    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    Dishes = data.Dishes;

    let index = Dishes.findIndex((ind) => ind.id == dishId);

    if (index == -1) {
        res.status(404).json({ "msg": "Dish Not Found" });
    }
    else {
        let updatedDishes = Dishes.map((el, i) => {
            if (el.id == dishId) {
                return { ...el, ...UpdateDish };
            } else {
                return el;
            }
        });
        data.Dishes = updatedDishes;
        fs.writeFileSync("./db.json", JSON.stringify(data))
        res.status(200).json({ msg: "Dish is Updated" });
    }

})

app.delete("/dishes/:dishId", (req, res) => {
    dishId = req.params.dishId;


    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    Dishes = data.Dishes;

    let index = Dishes.findIndex((ind) => ind.id == dishId);

    if (index == -1) {
        res.status(404).json({ "msg": "Dish Not Found" });
    }
    else {
        let updatedDishes = Dishes.filter((el, i) => {
            if (el.id != dishId) {
                return el;
            }
        });
        data.Dishes = updatedDishes;
        fs.writeFileSync("./db.json", JSON.stringify(data))
        res.status(200).json({ msg: "Dish is Deleted" });
    }

})

app.listen(3000, () => {
    console.log("server is started...");
})