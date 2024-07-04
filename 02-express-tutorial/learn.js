const express = require('express');
const morgan = require('morgan');
const app = express();

const logger = require('./logger');
const authorize = require('./authorize');

// if you use a middleware in a lot of routes, you can use app.use() to apply it to all routes
app.use([logger, morgan('tiny')]);
// we can add an argument to app.use() to apply the middleware to a specific route
// app.use('/basepath', logger);

app.get('/', (req, res) => {
    res.send('Home')
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/api/products', (req, res) => {
    res.send('Products');
});

app.get('/api/items', authorize, (req, res) => {
    console.log(req.user);
    res.send('Items');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});