var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');

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

app.get('/login', function(req, res) {
  console.log('received get at /login');
  res.send('Reached /login');
});

app.get('/signup', function(req, res) {
  console.log('received get at /signup');
  res.send('Reached /signup');
});

app.post('/signup', function(req, res) {
  console.log('received post at /signup');
  var user = {
    name: req.data.name,
    pass: req.data.pass
  };
  createUser(user);
  res.redirect('/show');
});

app.get('/addun', function(req, res) {
  console.log('received get at /addun');
  res.send('Reached /addun');
});

app.post('/addun', function(req, res) {
  console.log('received post at /addun');
  res.send('Posted at /addun');
});

app.delete('/addun', function(req, res) {
  console.log('received delete at /addun');
  res.send('Delete at /addun');
});



var dummyData = [
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": true
         }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": true
         }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": false
         }
        
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": true
         }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": false
         }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": true
         }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": false
         }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": true
         }
      },
      {
         "gameType": "MATCHED_GAME",
          "stats": {
            "win": true
          }
      },
      {
         "gameType": "MATCHED_GAME",
         "stats": {
            "win": false
         }
      }
   ];





app.get('/show', function(req, res) {
  res.json(dummyData);
  console.log('I got the get request');
  // User.findOne({name: req.data.name}, 'name list', function(err, result) {
  //   if (err) {
  //     return console.log('Error finding user in DB: ', err);
  //   } else {
  //     console.log('Results were delivered: ', result);
  //   }
  // });
  // console.log('received get at /show');
  // res.send('Reached /show');
});

app.listen(app.get('port'), function() {
  console.log('Server is alive and well... port is ' + app.get('port'));
});

