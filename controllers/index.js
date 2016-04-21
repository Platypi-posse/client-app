var express = require('express');
var controller = express.Router();
var http = require('http');

var models = require('../models/schema')

/* GET home page. */
controller.get('/', function(req, res, next) {
  res.render('index', { title: 'ChiStreetArt' });
});

controller.get('/thankyou', function(req,res,next){
  res.render('thankyou', { message: 'Thank you for submitting!'})
});

controller.get('/about', function(req,res, next){
  res.render('about', { title: 'About Us'})
})

controller.post('/', function(req, res, next){
  http.req()
})


module.exports = controller;
