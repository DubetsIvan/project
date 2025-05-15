
// routes/playlistRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/playlistController');
router.post('/', controller.createPlaylist);
router.delete('/:id', controller.deletePlaylist);
router.put('/:id/reorder', controller.reorderTracks);
router.post('/:id/tracks', controller.addTrackToPlaylist);
router.delete('/:playlistId/tracks/:trackId', controller.removeTrackFromPlaylist);
router.get('/:playlistId/search', controller.searchTracksInPlaylist);
module.exports = router;



