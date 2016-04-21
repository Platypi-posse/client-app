var mongoose = require('mongoose');

// userSchema

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
