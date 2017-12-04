const path = require('path');
const Express = require('express');
const http = require('http');

const PUBLIC_PATH = path.join(__dirname, 'public');
const JQUERY_PATH = path.join(__dirname, 'node_modules', 'jquery', 'dist');

const host = 'localhost';
const port = 4200;

const app = Express();

app.use('/', Express.static(PUBLIC_PATH));
app.use('/vendor/jquery', Express.static(JQUERY_PATH));

const server = http.createServer(app);

server.listen({ port, host }, () => {
  console.info(`Server listening on http://${host}:${port}...`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.info();
    console.info('Shutting down...');
    process.exit(0);
  });
});
