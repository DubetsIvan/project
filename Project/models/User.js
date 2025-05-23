const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: {
  type: String,
  required: [true, 'Поле "Email" обовʼязкове'],
  trim: true,
  lowercase: true,
  unique: true,
  match: [
    /^[\w.-]+@(gmail\.com|ukr\.net|email\.com)$/,
    'Email повинен бути з домену gmail.com, ukr.net або email.com'
     ]
  }
});

userSchema.virtual('userPlaylists', {
  ref: 'Playlist',
  localField: '_id',
  foreignField: 'user'
});

userSchema.set('toObject', {virtuals: true});
userSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', userSchema);