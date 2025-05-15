const User = require('../models/User');
const Playlist = require('../models/Playlist');
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};
exports.deleteUser = async (req, res) => {
  await Playlist.deleteMany({ user: req.params.id });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User and playlists deleted' });
};
