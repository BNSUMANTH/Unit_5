const express = require("express");
const {getT,addT,updateT,deleteT} = require("../controllers/todo.controler");

const router = express.Router();

router.get("/getTodos",getT);

router.post("/addTodo",addT);

router.put("/updateTodo/:id",updateT);
 
router.delete("/deleteTodo/:id",deleteT);

module.exports = router;