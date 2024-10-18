const express = require("express");
const { getItems, getItem, createItem } = require("../controllers/events");
const router = express.Router();


//TODO http://localhost/events GET,POST, DELETE,PUT

router.get("/",getItems);

router.post("/", createItem);



module.exports = router