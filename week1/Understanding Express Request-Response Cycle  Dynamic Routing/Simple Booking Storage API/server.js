const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json())

app.post("/books", (req, res) => {
    let newDish = req.body;

    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let Dishes = data.Dishes;
    Dishes.push(newDish);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(200).json({ "mes": "book added" });

})
app.get("/books", (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let Dishes = data.Dishes;
    res.status(200).json(Dishes);
})

app.get("/books/:dishId", (req, res) => {
    let dishId = req.params.dishId;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let Dishes = data.Dishes;

    let index = Dishes.findIndex((ind) => ind.id == dishId);
    if (index == -1) {
        res.status(404).json({ "msg": "Book Not Found" });
    }
    else {
        Dishes.forEach((ele, id) => {
            if (ele.id == dishId) {
                res.status(200).json({ msg: "Book details", book: ele });
            }
        });
    }

})

app.put("/books/:dishId", (req, res) => {
    dishId = req.params.dishId;

    let UpdateDish = req.body;

    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    Dishes = data.Dishes;

    let index = Dishes.findIndex((ind) => ind.id == dishId);

    if (index == -1) {
        res.status(404).json({ "msg": "Book Not Found" });
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

app.delete("/books/:dishId", (req, res) => {
    dishId = req.params.dishId;


    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    Dishes = data.Dishes;

    let index = Dishes.findIndex((ind) => ind.id == dishId);

    if (index == -1) {
        res.status(404).json({ "msg": "Book Not Found" });
    }
    else {
        let updatedDishes = Dishes.filter((el, i) => {
            if (el.id != dishId) {
                return el;
            }
        });
        data.Dishes = updatedDishes;
        fs.writeFileSync("./db.json", JSON.stringify(data))
        res.status(200).json({ msg: "Book is Deleted" });
    }

})

app.listen(3000, () => {
    console.log("server is started...");
})