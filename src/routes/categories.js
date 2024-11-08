const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');
const { authRole } = require('../middlewares/auth-role.middleware');
const { authUser } = require('../middlewares/auth-user.middleware');

// Obtener todas las categorías
// Respuesta: Array de categorías
router.get('/', getCategories); 

// Obtener categoría por ID
// Respuesta: Objeto de categoría si existe
router.get('/:id', getCategoryById); 

// Crear nueva categoría
// Requiere: { name, description }
// Respuesta: Objeto de la nueva categoría creada
router.post('/', authUser, authRole, createCategory); 

// Actualizar categoría
// Requiere: { name, description } (solo los campos que se deseen actualizar)
// Respuesta: Objeto de la categoría actualizada
router.patch('/:id', authUser, authRole, updateCategory); 

// Eliminar categoría
// Respuesta: Mensaje de éxito o error
router.delete('/:id', authUser, authRole, deleteCategory); 

module.exports = router;
