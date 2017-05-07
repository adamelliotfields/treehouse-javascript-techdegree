'use strict';

/* eslint no-console: off */

process.env.NODE_ENV = 'production';
process.env.IP = 'localhost';
process.env.PORT = 8080;

var express = require('express');
var compression = require('compression');
var promise = require('bluebird');
var moment = require('moment');

var app = express();

app.use(compression({ level: 9 }));

app.use('/', express.static('public'));
app.use('/css', express.static(__dirname + '/src/css'));

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  var Twit = require('twit');
  var config = require('./config');
  var T = new Twit(config);
  var tweets = [];
  var user = [];
  var message = [];

  promise.all([T.get('statuses/home_timeline', { count: 5 }, function (error, data, response) {
    for (var i = 0; i < data.length; i += 1) {
      tweets[i] = {
        profileImageURL: data[i].user.profile_image_url,
        name: data[i].user.name,
        screenName: data[i].user.screen_name,
        createdAt: moment(data[i].created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').format('hh:mm a'),
        text: data[i].text,
        retweetCount: data[i].retweet_count,
        favoriteCount: data[i].favorite_count
      };
    }
  })]).then(function () {
    res.render(__dirname + '/templates/index', { username: '@TheAdamFields', tweets: tweets });
  });
});

// Start the server
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Server listening on http://' + process.env.IP + ':' + process.env.PORT);
});

// Gracefully shut down the server on CTRL-C
// Express does not have a close method, so http.creatServer must be used
var server = require('http').createServer(app);
process.on('SIGINT', function () {
  server.close(function () {
    console.log('\n' + 'Shutting down...');
    process.exit(0);
  });
});