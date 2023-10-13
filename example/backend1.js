const http = require('http');

const PORT = 3002;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Response from Backend 2');
});

server.listen(PORT, () => {
  console.log(`Backend 2 running on port ${PORT}`);
});