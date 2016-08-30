var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var http = require('http');

// Database code

mongoose.connect('mongodb://localhost/mvp');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('DB error: ', err);
});

db.once('open', function() {
  console.log('Connected to DB');
});

var app = express();

// app.use(express.static(path.join(__dirname, './index.html')));
app.use(express.static('client'));


// defining the user schema

var users = mongoose.Schema({
  name: String,
  pass: String,
  list: String
});

// constructor for models in users
var User = mongoose.model('User', users);

var createUser = function(user) {
  var user = new User({
    name: user.name,
    pass: user.pass,
    list: ''
  });
  user.save(function(err, user) {
    if (err) {
      return console.log('Error creating user: ', err);
    }
  });
};

// Routes

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  console.log('received get at /');
});

// app.get('/login', function(req, res) {
//   console.log('received get at /login');
//   res.send('Reached /login');
// });

// app.get('/signup', function(req, res) {
//   console.log('received get at /signup');
//   res.send('Reached /signup');
// });

// app.post('/signup', function(req, res) {
//   console.log('received post at /signup');
//   var user = {
//     name: req.data.name,
//     pass: req.data.pass
//   };
//   createUser(user);
//   res.redirect('/show');
// });

// app.get('/addun', function(req, res) {
//   console.log('received get at /addun');
//   res.send('Reached /addun');
// });

// app.post('/addun', function(req, res) {
//   console.log('received post at /addun');
//   res.send('Posted at /addun');
// });

// app.delete('/addun', function(req, res) {
//   console.log('received delete at /addun');
//   res.send('Delete at /addun');
// });

app.post('/show', function(req, res) {
  var requestedName = req.query.name;
  request.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + requestedName + '?api_key=RGAPI-890114F9-577E-4F7B-9F95-C06BB656CB71', function(err, response, body) {
    if(err) {
      console.log('Error getting ID: ', err);
    } else {
      // removing spaces from username
      requestedName = requestedName.replace(/\s/g, '').toLowerCase();
      // parsing JSON response
      body = JSON.parse(body);
      var userId = body[requestedName].id;
      request.get('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + userId + '/recent?api_key=RGAPI-890114F9-577E-4F7B-9F95-C06BB656CB71', function(err, response, body) {
        if(err) {
          console.log('Error getting match history: ', err);
        } else {
          body = JSON.parse(body);
          var results = body.games.map(function(game) {
            return game.stats.win;
          });
          console.log('mapped results: ', results);
          res.send(results);
        }
      });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Server is alive and well... port is ' + app.get('port'));
});

