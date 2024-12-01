const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

router.post('/userPurchasesChart', chartController.getUserPurchases);

module.exports = router;
