#!/usr/bin/env node

const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

// Load backend servers from the configuration file.
let backendServers = [];
try {
    const data = fs.readFileSync('config.json', 'utf8');
    backendServers = JSON.parse(data).servers;
} catch (error) {
    console.error('Error reading the configuration file or parsing it:', error);
    process.exit(1);
}

let currentIndex = 0;

const proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    // Log when a route gets forwarded.
    console.log(`Forwarding request to: ${backendServers[currentIndex]}${req.url}`);
});

const server = http.createServer((req, res) => {
    // Determine the target server using the round-robin approach.
    const target = backendServers[currentIndex];
    currentIndex = (currentIndex + 1) % backendServers.length;

    // Proxy the request.
    proxy.web(req, res, { target: target }, (err) => {
        console.error('Error connecting to the backend server:', err.message);
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Bad Gateway');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Proxy server started on port ${PORT}`);
});
