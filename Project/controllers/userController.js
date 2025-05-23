const User = require('../models/User');
const Playlist = require('../models/Playlist');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('userPlaylists');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('userPlaylists');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};
exports.deleteUser = async (req, res) => {
  await Playlist.deleteMany({ user: req.params.id });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User and playlists deleted' });
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('playlists');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};