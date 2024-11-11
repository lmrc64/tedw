const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Crear una nueva categoría
router.post('/categories', categoryController.createCategory);

// Obtener todas las categorías
router.get('/categories', categoryController.getAllCategories);

// Obtener una categoría por ID
router.get('/categories/:id', categoryController.getCategoryById);

// Actualizar una categoría por ID
router.put('/categories/:id', categoryController.updateCategory);

// Eliminar una categoría por ID
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
