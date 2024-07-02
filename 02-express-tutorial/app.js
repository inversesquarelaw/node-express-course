const express = require('express');
const app = express();
const { products } = require('./data');

// Question 4
app.use(express.static('./public'));

// Question 7
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
});

// Question 8 - if you mis-type and leave out the leading slash, the route will not work!!!
app.get('/api/v1/products', (req, res) => {
    res.json(products);
});

// Question 9
app.get('/api/v1/products/:productID', (req, res) => {
    res.json(req.params);
});

// Question 6
app.all('*', (req, res) => {
    res.status(404).send('<h1>404! The page you requested is not found!</h1>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});