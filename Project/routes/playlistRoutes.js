const express = require('express');
const router = express.Router();
const controller = require('../controllers/playlistController');

router.get('/', controller.getAllPlaylists);
router.post('/', controller.createPlaylist);
router.get('/user/:userId', controller.getUserPlaylists);
router.delete('/:id', controller.deletePlaylist);
router.put('/:id/reorder', controller.reorderTracks);
router.post('/:id/tracks', controller.addTrackToPlaylist);
router.delete('/:id/tracks/:trackId', controller.removeTrackFromPlaylist);
router.get('/:id/search', controller.searchTracksInPlaylist);

module.exports = router;
