var express = require('express');
var controller = express.Router();
var http = require('http');

var models = require('../models/schema')

/* GET home page. */
controller.get('/', function(req, res, next) {
  // res.render('index', { title: 'ChiStreetArt' });
});

controller.post('/', function(req, res, next){
  http.req()
})


module.exports = controller;
