// backend/src/api/routes/priceRoutes.js
const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.get('/zerodha', priceController.getZerodhaGold);

module.exports = router;
