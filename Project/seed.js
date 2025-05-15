const mongoose = require('mongoose');
const User = require('./models/User');
const Playlist = require('./models/Playlist');
const Track = require('./models/Track');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Playlist.deleteMany();
  await Track.deleteMany();

  const user = await User.create({ username: 'username', email: 'lox228@gmail.com' });
  const track1 = await Track.create({ artist: 'Metallica', name: 'Enter Sandman', genre: 'Heavy-Metal', tags: ['Heavy-Metal'] });
  const track2 = await Track.create({ artist: 'bbno$', name: 'edamame', genre: 'Hip Hop', tags: ['Hip Hop'] });

  const playlist = await Playlist.create({ name: 'playlist', user: user._id, tracks: [track1._id, track2._id] });
  user.playlists.push(playlist._id);
  await user.save();

  console.log('Seed completed');
  mongoose.disconnect();
}
seed();
