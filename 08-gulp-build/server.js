process.env.IP = 'localhost';
process.env.PORT = '8080';

const path = require('path');
const http = require('http');
const express = require('express');
const connectLivereload = require('connect-livereload');
const ReactEngine = require('react-engine');
const expressView = require('react-engine/lib/expressView');
const opn = require('opn');
const livereload = require('livereload');

const app = express();

app.use(connectLivereload());

app.use('/content', express.static(path.join(__dirname, 'dist', 'content')));
app.use('/icons', express.static(path.join(__dirname, 'dist', 'icons')));
app.use('/lib', express.static(path.join(__dirname, 'dist', 'lib')));
app.use('/scripts', express.static(path.join(__dirname, 'dist', 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'dist', 'styles')));

app.engine('.js', ReactEngine.server.create({ staticMarkup: true }));

app.set('views', path.join(__dirname, 'dist', 'views'));
app.set('view engine', 'js');
app.set('view', expressView);

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on http://${process.env.IP}:${process.env.PORT}`);
  opn(`http://${process.env.IP}:${process.env.PORT}`);
});

livereload.createServer().watch(path.join(__dirname, 'dist', 'styles'));

process.on('SIGINT', () => {
  http.createServer(app)
    .close(() => {
      console.log('\n' + 'Shutting down...');
      process.exit(0);
    });
});
