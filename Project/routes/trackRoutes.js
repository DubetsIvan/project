const express = require('express');
const router = express.Router();
const controller = require('../controllers/trackController');
router.get('/', controller.getAllTracks);
router.get('/search-by-tag', controller.searchByTag);
router.get('/search-by-date', controller.searchByDate);
router.post('/', controller.createTrack);
module.exports = router;
