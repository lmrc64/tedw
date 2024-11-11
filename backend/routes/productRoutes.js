const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Crear un producto
router.post('/products', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getAllProducts);

// Obtener un producto por ID
router.get('/products/:id', productController.getProductById);

// Actualizar un producto por ID
router.put('/products/:id', productController.updateProduct);

// Eliminar un producto por ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
