'use strict';

process.env.NODE_ENV = 'production';
process.env.IP = 'localhost';
process.env.PORT = 8000;

var express = require('express');
var compression = require('compression');

var app = express();

app.use(compression({ level: 9 }));

app.use('/', express.static('public'));

app.set('view engine', 'pug');

app.get('/', function (request, response) {
  response.render(__dirname + '/views/index', { username: '@TheAdamFields' });
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Server listening on http://' + process.env.IP + ':' + process.env.PORT);
});

var server = require('http').createServer(app);

process.on('SIGINT', function () {
  server.close(function () {
    console.log('\n' + 'Shutting down...');
    process.exit(0);
  });
});
