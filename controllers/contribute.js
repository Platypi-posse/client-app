var express = require('express');
var controller = express.Router();
var http = require('http');

// var models = require('../models/schema')

/* GET home page. */
controller.get('/', function(req, res, next) {
  var request = http.get("http://localhost:5000/locations", function(response){
    var body = "";
    var location = "";
    response.on('data', function(chunk){
      body += chunk;
    })
    response.on('end', function(){
      console.log("no more data")
      if (response.statusCode == 200){
        location = JSON.parse(body);
        res.render('contribute', { title: 'Contribute', location: location});
      }
    })
  })
});


module.exports = controller;
