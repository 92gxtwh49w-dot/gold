const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailerController');

// Get current GRT price for a city
router.get('/grt/:city', retailerController.getGrtGoldByCity);

// Fetch GRT price for a city and store it in DB
router.post('/grt/:city/store', retailerController.getAndStoreGrtGoldByCity);

// Bhima Jewellers routes
router.get('/bhima/:state', retailerController.getAndStoreBhimaGoldRate);

// Lalitha Jewellery routes
router.get('/lalitha/:city', retailerController.getAndStoreLalithaGoldRate);

module.exports = router;
