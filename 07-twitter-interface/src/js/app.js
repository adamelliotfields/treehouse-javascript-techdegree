process.env.NODE_ENV = 'production';
process.env.IP = 'localhost';
process.env.PORT = 8000;

const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression({ level: 9 }));

app.use('/', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render(`${__dirname}/views/index`, { username: '@TheAdamFields' });
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on http://${process.env.IP}:${process.env.PORT}`);
});

const server = require('http').createServer(app);

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\n' + 'Shutting down...');
    process.exit(0);
  });  
});
