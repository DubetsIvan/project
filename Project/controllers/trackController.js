const Track = require('../models/Track');
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
