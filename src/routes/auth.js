const express = require("express");
const { register, login } = require("../controllers/auth-controller");
const router = express.Router();


//TODO http://localhost/events GET,POST, DELETE,PUT

router.post('/register', register); 
router.post('/login', login), 


module.exports = router