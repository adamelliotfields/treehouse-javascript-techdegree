const http = require('http');

const app = require('./app/index.js');

const server = http.createServer(app);

server.listen({ host: '127.0.0.1', port: app.get('port') }, () => {
  const address = server.address().address;
  const port = server.address().port;
  console.log(`Server listening on http://${address}:${port}`);
});
