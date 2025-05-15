const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
exports.createPlaylist = async (req, res) => {
  const playlist = await Playlist.create(req.body);
  res.status(201).json(playlist);
};
exports.deletePlaylist = async (req, res) => {
  await Playlist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Playlist deleted' });
};
exports.reorderTracks = async (req, res) => {
  const playlist = await Playlist.findByIdAndUpdate(req.params.id, { tracks: req.body.trackIds }, { new: true });
  res.json(playlist);
};
exports.addTrackToPlaylist = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  playlist.tracks.push(req.body.trackId);
  await playlist.save();
  res.json(playlist);
};
exports.removeTrackFromPlaylist = async (req, res) => {
  const playlist = await Playlist.findById(req.params.playlistId);
  playlist.tracks.pull(req.params.trackId);
  await playlist.save();
  res.json({ message: 'Track removed' });
};
exports.searchTracksInPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { date, tag } = req.query;
  const playlist = await Playlist.findById(playlistId).populate({
    path: 'tracks',
    match: {
      ...(date && { createdAt: { $gte: new Date(date) } }),
      ...(tag && { tags: tag })
    }
  });
  res.json(playlist.tracks);
};
