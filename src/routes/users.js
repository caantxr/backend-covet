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

// const express = require('express');
// const router = express.Router();

// const { authUser } = require('../middlewares/auth-user.middleware');
// const { authRole } = require('../middlewares/auth-role.middleware');
// const { 
//     createUser, 
//     getUser, 
//     getUserById, 
//     updateUserPatch, 
//     deleteUser 
// } = require('../controllers/users');

// // Crear un usuario
// router.post('/', authUser, authRole, async (req, res) => {
//     try {
//         const newUser = req.body;
//         // Aquí podrías agregar validaciones antes de crear el usuario
//         const createdUser = await createUser(newUser);
//         res.status(201).json(createdUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Obtener todos los usuarios
// router.get('/', authUser, authRole, async (req, res) => {
//     try {
//         const users = await getUser();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Otras rutas...

// module.exports = router;
