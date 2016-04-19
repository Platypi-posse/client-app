var express = require('express');
var controller = express.Router();
var http = require('http');
var querystring = require('querystring');

var models = require('../models/schema')

/* GET home page. */
controller.get('/', function(req, res, next) {
  // res.render('locations', { title: 'Locations' });
  var request = http.get("http://localhost:5000/locations", function(response){
    console.log(response.statusCode);
    var body = "";
    var location = "";
    response.on('data', function(chunk){
      console.log("body: " + chunk);
      console.log(body)
      body += chunk;
    })
    response.on('end', function(){
      console.log("no more data")
      if (response.statusCode == 200){
        location = JSON.parse(body);
        console.log(location);
        res.json(location)
      }
    })
  })
})

controller.post('/', function(req, res, next){
  var data = JSON.stringify({
    location_id: req.body.location_id,
    intersection: req.body.intersection,
    art_piece_name: req.body.art_piece_name,
    artist: req.body.artist,
    description: req.body.description,
    directions: req.body.directions
  });
  var options = {
    hostname: "localhost",
    port: 5000,
    path: "/locations/post",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data)
    }
  };
  var request = http.request(options, function(response){
    console.log(response.statusCode);
    var body = "";
    var message = "";
    response.on('data', function(chunk){
      console.log("body: " + chunk);
      console.log(body)
      body += chunk;
    })
    response.on('end', function(){
      console.log("no more data")
      if (response.statusCode == 200){
        message = JSON.parse(body);
        console.log(message);
        res.json(message)
      }
    })
  })
  request.on('error', function(e) {
    console.log("Error is here: " + e.message);
  });
  request.end(data);
})


module.exports = controller;
