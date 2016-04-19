var express = require('express');
var controller = express.Router();
var UserAccount = require('../models/UserAccount');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);

/* GET users listing. */
controller.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
    birthDate: String
  }*/
  // todo: data validation
  var userInfo = {
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, Salt),  // soon need to hash the user's password
    birthDate: req.body.birthdate
  };
  UserAccount.create(userInfo, function(error, user) {
    console.log('/users/register =>');
    console.log(user);
    res.json({ 'message': 'You have successfully registered an account!'});
  });
});

controller.post('/login', function(req, res, next) {
  //bcrypt.compareSync
  var userInfo = {
    email: req.body.email,
    password: req.body.password
  };
  UserAccount.find({ email: userInfo.email }, function(err, user) {
    // if we find our user.. compare passwords!
    console.log(userInfo);
    console.log(user);
    console.log(userInfo.password);
    var isPasswordValid = bcrypt.compareSync(userInfo.password, user[0].passwordHash);
    if (isPasswordValid) {
      // log user in
      console.log(req.session);
      req.session.user = user[0].email;
      console.log(req.session);
      res.json({ 'message': 'Logged in successfully'});
    } else {
      res.json({ 'message': 'Invalid username and/or password'});
    }
  });
});

module.exports = controller;
