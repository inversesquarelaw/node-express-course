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

// Question 9 and 10
app.get('/api/v1/products/:productID', (req, res) => {
    // note: req.params.productID is a string, so we need to convert it to a number by using parseInt
    const idToFind = parseInt(req.params.productID); 

    // here we use the find method to find the product with the id that matches the idToFind
    // remember that 'products' is an array of objects, so each element in the array is an object
    const product = products.find( (element) => element.id === idToFind );

    if( product === undefined ) {
        return res.status(404).json({ message: "That product was not found." });
    }

    // return the product object that matches the id
    res.json(product);
});

// Question 6
app.all('*', (req, res) => {
    res.status(404).send('<h1>404! The page you requested is not found!</h1>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});