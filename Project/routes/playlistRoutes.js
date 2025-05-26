const express = require('express');
const router = express.Router();
const controller = require('../controllers/playlistController');

router.get('/', controller.getAllPlaylists);
router.get('/:id', controller.getPlaylistById);
router.get('/user/:userId', controller.getUserPlaylists);
router.get('/:id/search', controller.searchTracksInPlaylist);
router.post('/', controller.createPlaylist);
router.post('/:id/tracks', controller.addTrackToPlaylist);
router.put('/:id/reorder', controller.reorderTracks);
router.delete('/:id', controller.deletePlaylist);
router.delete('/:id/tracks/:trackId', controller.removeTrackFromPlaylist);

module.exports = router;
