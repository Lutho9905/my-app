const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { path } = url.parse(req.url, true);  
    const method = req.method; 

   
    switch (method) {
        case 'GET':
            if (path === '/items') {
             
                fs.readFile('data.json', 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error reading data');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(data);
                });
            }
            break;

        case 'POST':
            if (path === '/items') {
            
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const newItem = JSON.parse(body);
                    fs.readFile('./data.json', 'utf8', (err, data) => {
                        if (err) {
                            console.error('File read error:', err);
                            res.writeHead(500);
                            res.end(`Error reading data: ${err.message}`);
                            return;
                        }
                        const items = JSON.parse(data);
                        items.push(newItem);
                        fs.writeFile('data.json', JSON.stringify(items), (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end('Error writing data');
                                return;
                            }
                            res.writeHead(201);
                            res.end('Item created');
                        });
                    });
                });
            }
            break;

        default:
            res.writeHead(405);
            res.end('Method Not Allowed');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
