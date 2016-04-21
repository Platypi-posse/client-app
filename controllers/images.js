var express = require('express');
var controller = express.Router();
var http = require('http');

var linkRequest = process.env.Link || "http://localhost:5000";

// var models = require('../models/schema')

/* GET home page. */
controller.get('/', function(req, res, next) {
  // res.render('locations', { title: 'Locations' });
  var request = http.get(linkRequest + "/images", function(response){
    // console.log(response.statusCode);
    var body = "";
    var image = "";
    response.on('data', function(chunk){
      // console.log("body: " + chunk);
      // console.log(body)
      body += chunk;
    })
    response.on('end', function(){
      // console.log("no more data")
      if (response.statusCode == 200){
        image = JSON.parse(body);
        // console.log(image);
        res.json(image);
      }
    })
  })
})

controller.post('/', function(req, res, next){
  var data = JSON.stringify({
    username: req.session.user,
    location_id: req.body.location_id,
    date: req.body.date,
    image: req.body.image
  });
  if (req.session.user) {
    if (req.body.image) {
      var options = {
        hostname: process.env.LinkNo || "localhost",
        port: process.env.Port || 5000,
        path: "/images/post",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data)
        }
      };
      var request = http.request(options, function(response){
        // console.log(response.statusCode);
        var body = "";
        var message = "";
        response.on('data', function(chunk){
          // console.log("body: " + chunk);
          // console.log(body)
          body += chunk;
        })
        response.on('end', function(){
          // console.log("no more data")
          if (response.statusCode == 200){
            message = JSON.parse(body);
            // console.log(message);
            res.json(message)
          }
        })
      })
      request.on('error', function(e) {
        console.log("Error is here: " + e.message);
      });
      request.end(data);
    } else {
      res.json({"message":"You must upload an image"});
    }
  } else {
    res.json({"message":"You must be logged in to post"});
  }
})


module.exports = controller;
