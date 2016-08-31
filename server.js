// loading dependencies

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var http = require('http');


// initializing database

mongoose.connect('mongodb://localhost/mvp');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('DB error: ', err);
});

db.once('open', function() {
  console.log('Connected to DB');
});


//creating instance of express 'app'

var app = express();


// serving static files

app.use(express.static('client'));


// defining the TrackedFriends schema

var TrackedFriends = new mongoose.Schema({
  name: String
});


// constructor for models in TrackedFriends

var TrackedFriend = mongoose.model('TrackedFriend', TrackedFriends);


// TrackedFriend constructor

var createFriend = function(name) {
  var friend = new TrackedFriend({
    name: name
  });

  // saves TrackedFriend to database
  friend.save(function(err, friend) {
    if (err) {
      return console.log('Error adding friend: ', err);
    } else {
      console.log(friend);
    }
  });
};


// Routes

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  console.log('received get at /');
});


// adding friend to page

app.post('/show', function(req, res) {
  var requestedName = req.query.name;

  // API request for playerId
  request.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + requestedName + '?api_key=RGAPI-890114F9-577E-4F7B-9F95-C06BB656CB71', function(err, response, body) {
    if(err) {
      console.log('Error getting ID: ', err);
    } else {

      // removing spaces from username
      requestedName = requestedName.replace(/\s/g, '').toLowerCase();

      // parsing JSON response
      body = JSON.parse(body);
      var userId = body[requestedName].id;

      // adding friend to database
      createFriend(requestedName); 

      // API request for match history
      request.get('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + userId + '/recent?api_key=RGAPI-890114F9-577E-4F7B-9F95-C06BB656CB71', function(err, response, body) {
        if(err) {
          console.log('Error getting match history: ', err);
        } else {

          // parsing JSON response
          body = JSON.parse(body);

          // pilfering results
          var results = body.games.map(function(game) {
            return game.stats.win;
          });

          // viewing results
          console.log('mapped results: ', results);

          //sending results
          res.send(results);
        }
      });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Server is alive and well... port is ' + app.get('port'));
});

