const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

http.createServer(function(req, res) {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', function(chunk) {
      body += chunk.toString();
    });
    req.on('end', function() {
      const data = querystring.parse(body);
      console.log(data);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Received the following data:\n\n');
      res.write(JSON.stringify(data, null, 2));
      res.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('get started.html', function(err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
      } else {
        res.end();
      }
    });
  }
}).listen(3000, function() {
  console.log('Server started listening on port 3000');
});
