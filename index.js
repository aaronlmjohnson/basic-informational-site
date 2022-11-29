const fs = require('fs');
const http = require('http');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res)=>{
    let pathName = getPathName(req);
    let filePath = path.join(__dirname, 'public', pathName);
    
    let contentType = 'text/html';
    fs.readFile(filePath, (err, content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content, 'utf-8');
                });
            }
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(content);
    });
});

const getPathName = (req) =>{
    let path = '';
    if(req.url === '/') path = 'index.html';
    else if(req.url === '/about') path = 'about.html';
    else if(req.url === '/contact-me') path = 'contact-me.html';
    else path = '404.html';
    return path;
}


server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})