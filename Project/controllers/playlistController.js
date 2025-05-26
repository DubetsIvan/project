const Playlist = require('../models/Playlist');
const Track = require('../models/Track');

exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('tracks');
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlists', details: err.message });
  }
}

exports.getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id).populate('tracks');
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlist', details: err.message });
  }
}

exports.createPlaylist = async (req, res) => {
  try {
    const { name, tracks, user } = req.body;
    const playlist = await Playlist.create({ name, tracks, user });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create playlist', details: err.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    await Playlist.findByIdAndDelete(id);
    res.status(200).json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
};

exports.reorderTracks = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackIds } = req.body;

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    // перевірка, чи передані ID є підмножиною існуючих треків
    const allTrackIds = playlist.tracks.map(id => id.toString());
    const providedIds = trackIds.map(id => id.toString());

    const isSameLength = allTrackIds.length === providedIds.length;
    const isSameContent = allTrackIds.every(id => providedIds.includes(id));

    if (!isSameLength || !isSameContent) {
      return res.status(400).json({ error: 'Provided trackIds do not match existing tracks in playlist' });
    }

    // оновлення порядку
    playlist.tracks = trackIds;
    await playlist.save();

    res.status(200).json({ message: 'Tracks reordered successfully', playlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder tracks', details: err.message });
  }
};

exports.addTrackToPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackId } = req.body;

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (playlist.tracks.includes(trackId)) {
      return res.status(400).json({ error: 'Track already exists in playlist' });
    }

    playlist.tracks.push(trackId);
    await playlist.save();

    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add track' });
  }
};

exports.removeTrackFromPlaylist = async (req, res) => {
  try {
    const { id, trackId } = req.params;

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    playlist.tracks.pull(trackId);
    await playlist.save();

    res.status(200).json({ message: 'Track removed from playlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove track' });
  }
};

exports.searchTracksInPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, tag } = req.query;
    const match = {};
    if (date) match.createdAt = { $gte: new Date(date) };
    if (tag) match.tags = tag;

    const playlist = await Playlist.findById(id).populate({ path: 'tracks', match });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    res.status(200).json(playlist.tracks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search tracks' });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await Playlist.find({ user: userId }).populate('tracks');
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user playlists', details: err.message });
  }
};
