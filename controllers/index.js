var express = require('express');
var controller = express.Router();

var models = require('../models/schema')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ChiStreetArt' });
});

module.exports = router;
