/*
  eslint
  node/no-missing-require: off,
  no-unused-vars: off,
  no-console: off,
  camelcase: off,
  no-process-exit: off
*/

process.env.NODE_ENV = 'production';
process.env.IP = 'localhost';
process.env.PORT = 8080;

const express = require('express');
const compression = require('compression');
const promise = require('bluebird');
const moment = require('moment');

const app = express();

// Set gzip compression to max
app.use(compression({ level: 9 }));

// Serve CSS and images
app.use('/images', express.static(`${__dirname}/public/images`));

/* Comment out when serving the unminified CSS */
app.use('/css', express.static(`${__dirname}/public/css`));

/* Uncomment to serve the unminified CSS */
// app.use('/css', express.static(`${__dirname}/src/css`));

// Set view engine to Pug
app.set('view engine', 'pug');

// Index route
app.get('/', (req, res) => {
  const Twit = require('twit');
  const config = require('./config');
  const T = new Twit(config);
  const tweets = [];
  const users = [];
  const messages = [];
  let account = {};

  // Add all Twitter GET requests to promise.all
  promise.all([
    T.get('account/verify_credentials', { skip_status: true }, (error, data, response) => {
      account = {
        profileImageURL: data.profile_image_url,
        screenName: data.screen_name
      };
    }),
    T.get('statuses/home_timeline', { count: 5 }, (error, data, response) => {
      for (let i = 0; i < data.length; i += 1) {
        tweets[i] = {
          profileImageURL: data[i].user.profile_image_url,
          name: data[i].user.name,
          screenName: data[i].user.screen_name,
          createdAt: moment(data[i].created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').format('MMM Do, YYYY hh:mm a'),
          text: data[i].text,
          retweetCount: data[i].retweet_count,
          favoriteCount: data[i].favorite_count
        };
      }
    }),
    T.get('friends/list', { count: 5 }, (error, data, response) => {
      for (let i = 0; i < data.users.length; i += 1) {
        users[i] = {
          profileImageURL: data.users[i].profile_image_url,
          name: data.users[i].name,
          screenName: data.users[i].screen_name
        };
      }
    }),
    T.get('direct_messages', { count: 5 }, (error, data, response) => {
      for (let i = 0; i < data.length; i += 1) {
        messages[i] = {
          profileImageURL: data[i].sender.profile_image_url,
          name: data[i].sender.name,
          text: `${data[i].text.substring(0, 117)}...`,
          createdAt: moment(data[i].created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').format('MMM Do, YYYY hh:mm a')
        };
      }
    })
  // Render the page once all GET requests have been fulfilled
  ]).then(() => {
    res.render(`${__dirname}/templates/index`, { account, tweets, users, messages });
  });
});

// Start the server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on http://${process.env.IP}:${process.env.PORT}`);
});

// Gracefully shut down the server on CTRL-C
// Use http.creatServer because Express doesn't have a close method
const server = require('http').createServer(app);
process.on('SIGINT', () => {
  server.close(() => {
    console.log('\n' + 'Shutting down...');
    process.exit(0);
  });  
});
