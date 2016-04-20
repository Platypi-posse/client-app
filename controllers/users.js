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
  UserAccount.findOne({ username: new RegExp('^'+req.body.username+'$', "i")}, function(err, user) {
      var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      if (user) {
        if (user.username.toLowerCase() === req.body.username.toLowerCase()) {
          res.json({'message': 'The username already exists'});
        }
      } else if (req.body.password.length < 6) {
        res.json({'message': 'The password is shorter than 6 characters'});
      } else if (!regExp.test(req.body.password)) {
        res.json({'message': 'Password must contain a special chracter(!@#$%^&*) and a number'});
      } else {
        var user = new UserAccount({ username: req.body.username, email: req.body.email, passwordHash: bcrypt.hashSync(req.body.password, Salt)})
        user.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            res.json({'message': 'You have successfully registered an account!'})
          }
        });
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
  UserAccount.findOne({ username: userInfo.username }, function(err, user) {
    // if we find our user.. compare passwords!
    var isPasswordValid = bcrypt.compareSync(userInfo.password, user.passwordHash);
    if (isPasswordValid) {
      // log user in
      req.session.user = user.username;
      console.log(req.session);
      res.json({ 'message': 'Logged in successfully'});
    } else {
      res.json({ 'message': 'Invalid username and/or password'});
    }
  });
});

module.exports = controller;
