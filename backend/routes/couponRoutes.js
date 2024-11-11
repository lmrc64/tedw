const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// Crear un nuevo cupón
router.post('/coupons', couponController.createCoupon);

// Obtener todos los cupones
router.get('/coupons', couponController.getAllCoupons);

// Obtener un cupón por código
router.get('/coupons/code/:codigo', couponController.getCouponByCode);

// Obtener un cupón por ID
router.get('/coupons/:id', couponController.getCouponById);

// Actualizar un cupón por ID
router.put('/coupons/:id', couponController.updateCoupon);

// Eliminar un cupón por ID
router.delete('/coupons/:id', couponController.deleteCoupon);

module.exports = router;
