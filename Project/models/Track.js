const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  artist: String,
  name: String,
  genre: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Track', trackSchema);
