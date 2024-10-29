const express = require("express");
const { getEvents, createEvent,getEventById,updateEventPatch,deleteEvent,getEventByName,getEventsByCategory } = require("../controllers/events");
const { authUser } = require('../middlewares/auth-user.middleware.js');
const { authRole } = require('../middlewares/auth-role.middleware.js');
const router = express.Router();


//TODO http://localhost/events GET,POST, DELETE,PUT

// Obtener todos los eventos
router.get("/", getEvents); 

// Crear un nuevo evento (requiere autenticación y rol)
router.post("/", authUser, authRole, createEvent); 

// Obtener un evento por ID
router.get("/:id", getEventById); 

// Actualizar un evento por ID (requiere autenticación y rol)
router.patch("/:id", authUser, authRole, updateEventPatch); 

// Eliminar un evento por ID (requiere autenticación y rol)
router.delete("/:id", authUser, authRole, deleteEvent); 

// Buscar eventos por nombre y descripción
router.post("/search", getEventByName); 

// Obtener eventos por categoría
router.get("/category/:categoryName", getEventsByCategory); 

module.exports = router;

// const express = require("express");
// const {
//     getEvents,
//     createEvent,
//     getEventById,
//     updateEventPatch,
//     deleteEvent,
//     getEventByName,
//     getEventsByCategory
// } = require("../controllers/events");
// const { authUser } = require('../middlewares/auth-user.middleware.js');
// const { authRole } = require('../middlewares/auth-role.middleware.js');

// const router = express.Router();

// // Obtener todos los eventos
// // Respuesta: Array de eventos
// router.get("/", getEvents);

// // Crear un nuevo evento (requiere autenticación y rol de administrador)
// // Requiere: { title, description, date, location, capacity, price }
// // Respuesta: Objeto del evento creado
// router.post("/", authUser, authRole("admin"), createEvent);

// // Obtener un evento por ID
// // Respuesta: Objeto del evento
// router.get("/:id", getEventById);

// // Actualizar un evento por ID (requiere autenticación y rol de administrador)
// // Requiere: { title, description, date, location, capacity, price }
// // Respuesta: Objeto del evento actualizado
// router.patch("/:id", authUser, authRole("admin"), updateEventPatch);

// // Eliminar un evento por ID (requiere autenticación y rol de administrador)
// // Respuesta: Mensaje de confirmación de eliminación
// router.delete("/:id", authUser, authRole("admin"), deleteEvent);

// // Buscar eventos por nombre y descripción
// // Cambiado a GET para seguir convenciones REST
// // Respuesta: Array de eventos que coinciden con la búsqueda
// router.get("/search", getEventByName);

// // Obtener eventos por categoría
// // Respuesta: Array de eventos de la categoría especificada
// router.get("/category/:categoryName", getEventsByCategory);

// module.exports = router;