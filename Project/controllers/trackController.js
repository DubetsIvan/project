const Track = require('../models/Track');

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks', details: err.message });
  }
}

exports.getTrackByTag = async (req, res) => { 
  const { tag } = req.params;
  try {
    const tracks = await Track.find({ tags: tag });
    if (tracks.length === 0) {
      return res.status(404).json({ message: 'No tracks found with this tag' });
    }
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks', details: err.message });
  }
}

exports.createTrack = async (req, res) => {
  const track = await Track.create(req.body);
  res.status(201).json(track);
};
exports.searchTracks = async (req, res) => {
  const { date, tag } = req.query;
  const filter = {};
  if (date) filter.createdAt = { $gte: new Date(date) };
  if (tag) filter.tags = tag;
  const tracks = await Track.find(filter);
  res.json(tracks);
};
