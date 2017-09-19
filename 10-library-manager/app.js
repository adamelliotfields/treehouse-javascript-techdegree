const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const co = require('co');

const sequelize = require('./models').sequelize;

const index = require('./routes/index');
const books = require('./routes/books');
const loans = require('./routes/loans');
const patrons = require('./routes/patrons');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/books', books);
app.use('/loans', loans);
app.use('/patrons', patrons);

// Internal server error handler
app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);
  response.status(500);
  response.render('error', { error: { message: 'Sorry, there was an error. Please try again.' } });
});

// Not found error handler
app.use((request, response) => {
  response.status(404);
  response.render('error', { error: { message: 'Page not found!' } });
});

// Create a new HTTP server
const server = http.createServer(app);

// Start the server after sequelize's Promise has resolved
co(function * () {
  try {
    yield sequelize.sync();
    server.listen(8080, () => {
      console.log('Server listening on http://localhost:8080');
    });
  } catch (error) {
    if (error) throw error;
  }
});
