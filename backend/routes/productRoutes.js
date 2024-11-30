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
router.get('/products/user/:user', productController.getProductByUser);


// Obtener un producto por ID
router.get('/products/:id', productController.getProductById);

// Actualizar un producto por ID
router.put('/products/:id', productController.updateProduct);

// Eliminar un producto por ID
router.delete('/products/:id', productController.deleteProduct);

//Change Visible
router.patch('/products/:id/visibility', productController.updateProductVisibility);

//Get Visible
router.get('/products/visibility/all', productController.getAllProductsVisibles);
router.get('/products/:id/visibility', productController.getProductByIdVisible);


//Get Products Visibility
router.get('/products/user/:user/:visible', productController.getProductByUserVisibility);


module.exports = router;
