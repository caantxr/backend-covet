const express = require("express");
const { register, login, registerBusiness } = require("../controllers/auth-controller");
const router = express.Router();

// Rutas de autenticación
// POST /auth/register - Registrar un nuevo usuario
router.post('/register', register);
router.post('/register/business', registerBusiness ); 

// POST /auth/login - Iniciar sesión de un usuario
router.post('/login', login); 

module.exports = router;
