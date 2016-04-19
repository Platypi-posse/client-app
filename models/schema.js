var mongoose = require('mongoose');

// userSchema

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String
});

var User = mongoose.model('User', userSchema);

// locationSchema

var locationSchema = new mongoose.Schema({
  location_id: Number,
  coordinates: String,
  art_piece_name: String,
  artist: [],
  description: String,
  directions: String
});

var Location = mongoose.model('Location', locationSchema);

// imageSchema

var imageSchema = new mongoose.Schema({
  username: String,
  location_id: String,
  date: Date,
  image: String,
});

var Image = mongoose.model('Image', imageSchema);

module.exports = {
  User: User,
  Location: Location,
  Image: Image
};
