console.log('Express Tutorial')

const http = require('http');

const server = http.createServer((req, res) => {
    // the header of the response
    res.writeHead(200, {'content-type': 'text/html'});
    
    // showing the difference content type has on the response
    res.writeHead(200, {'content-type': 'text/plain'});
    // if we change the content type to text/plain, the html tags will be displayed as text
    // like this: <h1>Home Page</h1>

    // the body of the response
    res.write('<h1>Home Page</h1>');

    // end the response
    res.end();
});

server.listen(5000);