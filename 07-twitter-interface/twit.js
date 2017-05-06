'use strict';

var Twit = require('twit');

var api = require('./config');

var T = new Twit(api.key);

T.get('direct_messages', { count: 1 }, function (err, data, response) {
  console.log(data);
});