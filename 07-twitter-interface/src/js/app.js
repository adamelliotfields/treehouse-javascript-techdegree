/* eslint no-console: off */

process.env.NODE_ENV = 'production';
process.env.IP = 'localhost';
process.env.PORT = 8080;

const express = require('express');
const compression = require('compression');
const promise = require('bluebird');
const moment = require('moment');

const app = express();

app.use(compression({ level: 9 }));

app.use('/', express.static('public'));
app.use('/css', express.static(`${__dirname}/src/css`));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const Twit = require('twit');
  const config = require('./config');
  const T = new Twit(config);
  const tweets = [];
  const user = [];
  const message = [];

  promise.all([
    T.get('statuses/home_timeline', { count: 5 }, (error, data, response) => {
      for (let i = 0; i < data.length; i += 1) {
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
    })
  ]).then(() => {
    res.render(`${__dirname}/templates/index`, { username: '@TheAdamFields', tweets });
  });
});

// Start the server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on http://${process.env.IP}:${process.env.PORT}`);
});

// Gracefully shut down the server on CTRL-C
// Express does not have a close method, so http.creatServer must be used
const server = require('http').createServer(app);
process.on('SIGINT', () => {
  server.close(() => {
    console.log('\n' + 'Shutting down...');
    process.exit(0);
  });  
});
