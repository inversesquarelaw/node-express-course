const express = require('express');
const path = require('path');
const { products } = require('./data');

const app = express();

// alternatively, we can write the above 2 lines as: 
// const app = require('express')();
// this is because the express module exports a function that we can invoke/call directly

app.get('/', (req, res) => {
    res.json(products);
});


/*
// setup static and middleware
// the express.static() method is a built-in middleware function in Express. It serves static files and is based on serve-static.
// static files are files that clients download as they are from the server: like images, css, js files, etc.
app.use(express.static('./navbar-app'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
    // since index.html is a static asset, there's no reason to use the sendFile() method, just put it in the public folder
    // adding to static assets or server side rendering
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
});
*/



app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});

/*
const http = require('http');

const server = http.createServer((req, res) => {
    // the header of the response
    //res.writeHead(200, {'content-type': 'text/html'});
    
    // showing the difference content type has on the response
    //res.writeHead(200, {'content-type': 'text/plain'});
    // if we change the content type to text/plain, the html tags will be displayed as text
    // like this: <h1>Home Page</h1>

    // we can also change the status code to 404, even though the page is found
    // the status codes are determined by the programmer so we can set it to anything
    // 404 is just a convention for page not found 
    res.writeHead(404, {'content-type': 'text/html'});
    // the write() method is for returning the body of the response
    res.write('<h1>This website is loading correctly, but returning a HTTP 404! Inspect the browser developer tools "Network" tab!<h1>');

    // another respose with a 200 status code
    //res.writeHead(200, {'content-type': 'text/html'});
    //res.write('This response is sending back a HTTP 200 status code!');

    // end the response - cant' have more stuff after this
    res.end();



});

server.listen(5000);
*/