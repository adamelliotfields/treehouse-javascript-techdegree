const Twit = require('twit');

const api = require('./config');

const T = new Twit(api.key);

T.get('direct_messages', { count: 1 }, (err, data, response) => {
  console.log(data);
});
