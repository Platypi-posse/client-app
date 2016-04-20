var express = require('express');
var controller = express.Router();
var http = require('http');

// var models = require('../models/schema')

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
        console.log("location here:")
        console.log(location);
        console.log("location[0] here:")
        console.log(location[0]);

        res.json(location)
      }
    })
  })
})

controller.get('/:id', function(req, res, next) {
  // res.render('locations', { title: 'Locations' });
  var id = req.params.id;
  var request = http.get("http://localhost:5000/locations/" + id, function(response){
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
        console.log("location here:")
        console.log(location);
        if (location === null) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        }
        else {
          intersection = location.intersection;
          console.log(intersection);
          art_piece_name = location.art_piece_name;
          console.log(art_piece_name);
          description = location.description;
          console.log(description)
          directions = location.directions;
          console.log(directions);
          artist = location.artist;
          console.log(artist);
          // res.json(location[0]);
          res.render('locations', { title: 'Art Pieces/Locations', location: intersection, art_piece_name: art_piece_name, description: description, directions: directions, artist: artist })
        }
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
