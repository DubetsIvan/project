const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Playlist', playlistSchema);
