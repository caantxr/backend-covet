const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');

router.get('/', getCategories); // Obtener todas las categorías
router.get('/:id', getCategoryById); // Obtener categoría por ID
router.post('/', createCategory); // Crear nueva categoría
router.patch('/:id', updateCategory); // Actualizar categoría
router.delete('/:id', deleteCategory); // Eliminar categoría

module.exports = router;