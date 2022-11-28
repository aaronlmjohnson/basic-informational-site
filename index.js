const fs = require('fs');
const http = require('http');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    });
    
});

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})