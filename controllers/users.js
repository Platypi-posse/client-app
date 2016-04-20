var express = require('express');
var controller = express.Router();
var UserAccount = require('../models/schema');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);

/* GET users listing. */
controller.get('/', function(req, res, next) {
  res.render('loginregister', { title: 'Locations' });
});

controller.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.json({ 'message': 'You have been logged out.'});
});

// CREATE an account
controller.post('/register', function(req, res, next) {
  /*{
    name: String,
    email: String,
    passwordHash: String,
  }*/
  // todo: data validation
  var userInfo = {
    username: req.body.username,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, Salt),  // soon need to hash the user's password
  };
  var user = new UserAccount.User({ username: req.body.username, email: req.body.email, passwordHash: req.body.password});
  console.log(user);
  user.save(function (err) {
    if (err) {
      return console.log(err);
    } else {
      res.json({'message': 'You have successfully registered an account!'})
    }
  });
  // UserAccount.create(userInfo, function(error, user) {
  //   console.log('/users/register =>');
  //   console.log(user);
  //   res.json({ 'message': 'You have successfully registered an account!'});
  // });
});

controller.post('/login', function(req, res, next) {
  //bcrypt.compareSync
  var userInfo = {
    username: req.body.username,
    password: req.body.password
  };
  UserAccount.findOne({ email: userInfo.email }, function(err, user) {
    // if we find our user.. compare passwords!
    var isPasswordValid = bcrypt.compareSync(userInfo.password, user.passwordHash);
    if (isPasswordValid) {
      // log user in
      console.log(req.session);
      req.session.user = user.username;
      console.log(req.session);
      res.json({ 'message': 'Logged in successfully'});
    } else {
      res.json({ 'message': 'Invalid username and/or password'});
    }
  });
});

module.exports = controller;
