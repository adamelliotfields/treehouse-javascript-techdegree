const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const co = require('co');
const morgan = require('morgan');
const parser = require('body-parser');
const seeder = require('mongoose-seeder');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const data = require('../data/data.json');
const routes = require('../router/index.js');

mongoose.Promise = bluebird;
mongoose.connect('mongodb://127.0.0.1:27017/course-rating-api');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', co.wrap(function * () {
  console.log('Connected to MongoDB on port 27017');
  try {
    yield seeder.seed(data, { dropDatabase: true });
    console.log('Seeding complete.');
  } catch (error) {
    console.log('Seeding error:');
    console.log(error);
  }
}));

const app = express();

// Set port
app.set('port', process.env.PORT || 5000);

// HTTP logging
app.use(morgan('dev'));

// Session storage
app.use(session({
  secret: 'may the force be with you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Parse request bodies
app.use(parser.json());

// Routes
app.use('/api', routes);

// Catch 404 and forward to global error handler
app.use((request, response, next) => {
  const error = new Error('File Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    status: error.status,
    message: error.message
  });
});

module.exports = app;
