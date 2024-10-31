const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/proxy') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const targetUrl = body.trim();

            if (!targetUrl) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('URL parameter is required');
                return;
            }

            const protocol = targetUrl.startsWith('https') ? https : http;

            const options = {
                method: 'GET',
                headers: {
                    host: url.parse(targetUrl).host,
                    'User-Agent': 'Mozilla/5.0', 
                },
            };

            const proxyRequest = protocol.request(targetUrl, options, (proxyResponse) => {
               
                res.writeHead(proxyResponse.statusCode, {
                    ...proxyResponse.headers,
                    'Access-Control-Allow-Origin': '*', 
                });
                proxyResponse.pipe(res, { end: true });
            });

            proxyRequest.on('error', (err) => {
                console.error('Proxy error:', err.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Proxy error');
            });

            proxyRequest.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
