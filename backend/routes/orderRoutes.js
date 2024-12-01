const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Crear una nueva orden
router.post('/orders', orderController.createOrder);

//charts for the user
router.get('/monthlyOrders/:id', orderController.getUserMonthlyOrders)
router.get('/monthlySales/:id', orderController.getUserMonthlySales) //Need to be fixed

//charts for the admin
router.get('/monthlyOrders', orderController.getMonthlyOrders)
router.get('/weeklyOrders', orderController.getWeeklyOrders)
router.get('/yearlyOrders', orderController.getYearlyOrders)


router.get('/currentYearOrders', orderController.getCurrentYearOrders)
router.get('/currentYearProducts', orderController.getCurrentYearProducts)

// Obtener todas las órdenes
router.get('/orders', orderController.getAllOrders);

// Obtener una orden por ID
router.get('/orders/:id', orderController.getOrderById);

// Actualizar una orden por ID
router.put('/orders/:id', orderController.updateOrder);

// Eliminar una orden por ID
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
