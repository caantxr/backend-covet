const express = require("express");
const { 
    getBusinesses, 
    createBusiness, 
    getBusinessById, 
    updateBusiness, 
    deleteBusiness, 
    getBusinessByName, 
    getBusinessesByCategory 
} = require("../controllers/business");
const { authUser } = require('../middlewares/auth-user.middleware.js');
const { authRole } = require('../middlewares/auth-role.middleware.js');
const { authRoleBowner } = require("../middlewares/auth-role-bo.middleware copy.js");
const router = express.Router();

//TODO http://localhost/businesses GET, POST, DELETE, PUT

// Obtener todos los negocios
router.get("/",authUser, authRole, getBusinesses); 

// Crear un nuevo negocio (requiere autenticación y rol)
router.post("/", authUser, authRoleBowner, createBusiness); 

// Obtener un negocio por ID
router.get("/:id",authUser,authRoleBowner, getBusinessById); 

// Actualizar un negocio por ID (requiere autenticación y rol)
router.patch("/:id", authUser, authRoleBowner, updateBusiness); 

// Eliminar un negocio por ID (requiere autenticación y rol)
router.delete("/:id", authUser, authRoleBowner, deleteBusiness); 

// Buscar negocios por nombre y descripción
// router.post("/search", getBusinessByName); 

// Obtener negocios por categoría
// router.get("/category/:categoryName", getBusinessesByCategory); 

module.exports = router;
