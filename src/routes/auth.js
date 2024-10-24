const express = require("express");
const { register, login } = require("../controllers/auth-controller");
const router = express.Router();

// Rutas de autenticación
// POST /auth/register - Registrar un nuevo usuario
router.post('/register', register); 

// POST /auth/login - Iniciar sesión de un usuario
router.post('/login', login); 

module.exports = router;
