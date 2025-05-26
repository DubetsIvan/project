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

exports.searchByTag = async (req, res) => {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: 'Потрібно вказати тег' });

  try {
    const tracks = await Track.find({ tag: { $in: [tag] } });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Помилка пошуку', details: err.message });
  }
};

exports.searchByDate = async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Потрібно вказати дату' });

  try {
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const tracks = await Track.find({
      createdAt: { $gte: start, $lte: end }
    });

    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Помилка пошуку', details: err.message });
  }
};
