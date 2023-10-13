const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Response from Backend 1');
});

server.listen(PORT, () => {
  console.log(`Backend 1 running on port ${PORT}`);
});
