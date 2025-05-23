

// routes/trackRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/trackController');
router.get('/', controller.getAllTracks);
router.post('/', controller.createTrack);
router.get('/search', controller.searchTracks);
module.exports = router;

