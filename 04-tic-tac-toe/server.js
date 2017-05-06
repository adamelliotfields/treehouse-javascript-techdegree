process.env.NODE_ENV = 'production';
process.env.IP = 'localhost';
process.env.PORT = 8080;

const express = require('express');

const app = express();

app.use('/', express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server listening on', `http://${process.env.IP}:${process.env.PORT}`);
});

const server = require('http').createServer(app);

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\n' + 'Shutting down...');
    process.exit(0);
  });
});
