const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Crear un nuevo usuario
router.post('/register', userController.createUser);

// Iniciar sesión
router.post('/login', userController.login);

// Obtener todos los usuarios
router.get('/users', userController.getUsers);

// Obtener un usuario por ID
router.get('/users/:id', userController.getUserById);

// Actualizar un usuario
router.put('/users/:id', userController.updateUser);

// Eliminar un usuario
router.delete('/users/:id', userController.deleteUser);


//charts for the admin
router.get('/chart/currentYearUsers', userController.getCurrentYearUsers)

module.exports = router;
