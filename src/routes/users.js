const express = require('express');
const router = express.Router();

const { authUser } = require('../middlewares/auth-user.middleware');
const { authRole } = require('../middlewares/auth-role.middleware');
const { 
    createUser, 
    getUser, 
    getUserById, 
    updateUserPatch, 
    deleteUser 
} = require('../controllers/users');

// Crear un usuario
router.post('/', authUser, authRole, createUser);

// Obtener todos los usuarios
router.get('/', authUser, authRole, getUser);

// Obtener un usuario por su ID
router.get('/:id', authUser, authRole, getUserById);

// Actualizar parcialmente un usuario
router.patch('/:id', authUser, authRole, updateUserPatch);

// Eliminar un usuario
router.delete('/:id', authUser, authRole, deleteUser);

module.exports = router;
