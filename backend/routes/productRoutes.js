const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Crear un producto
router.post('/products', productController.createProduct);
router.post('/products/name', productController.createProductNameCategory);


// Obtener todos los productos
router.get('/products', productController.getAllProducts);
router.get('/productsCategory', productController.getProductByCategory);
router.get('/products/search', productController.getProductByName);


// Obtener un producto por ID
router.get('/products/:id', productController.getProductById);

// Actualizar un producto por ID
router.put('/products/:id', productController.updateProduct);

// Eliminar un producto por ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
