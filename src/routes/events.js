const express = require("express");
const { getEvents, createEvent,getEventById,updateEventPatch,deleteEvent,getEventByName,getEventsByCategory } = require("../controllers/events");
const { authUser } = require('../middlewares/auth-user.middleware.js');
const { authRole } = require('../middlewares/auth-role.middleware.js');
const { authRoleBowner } = require("../middlewares/auth-role-bo.middleware copy.js");
const router = express.Router();


//TODO http://localhost/events GET,POST, DELETE,PUT

// Obtener todos los eventos
router.get("/", getEvents); 

// Crear un nuevo evento (requiere autenticación y rol)
router.post("/register", authUser, authRoleBowner, createEvent); 

// Obtener un evento por ID
router.get("/:id", getEventById); 

// Actualizar un evento por ID (requiere autenticación y rol)
router.patch("/:id", authUser, authRoleBowner, updateEventPatch); 

// Eliminar un evento por ID (requiere autenticación y rol)
router.delete("/:id", authUser, authRoleBowner, deleteEvent); 

// Buscar eventos por nombre y descripción
router.post("/search", getEventByName); 

// Obtener eventos por categoría
router.get("/category/:categoryName", getEventsByCategory); 

module.exports = router;
