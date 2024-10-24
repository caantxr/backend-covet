const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');

// Obtener todas las categorías
// Respuesta: Array de categorías
router.get('/', getCategories); 

// Obtener categoría por ID
// Respuesta: Objeto de categoría si existe
router.get('/:id', getCategoryById); 

// Crear nueva categoría
// Requiere: { name, description }
// Respuesta: Objeto de la nueva categoría creada
router.post('/', createCategory); 

// Actualizar categoría
// Requiere: { name, description } (solo los campos que se deseen actualizar)
// Respuesta: Objeto de la categoría actualizada
router.patch('/:id', updateCategory); 

// Eliminar categoría
// Respuesta: Mensaje de éxito o error
router.delete('/:id', deleteCategory); 

module.exports = router;
