const express = require('express');
const app = express();
const { products } = require('./data');
const { people } = require('./data');

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    console.log(method, url, new Date(Date.now()).toISOString());
    next();
}

app.use(logger);

// Question 4
app.use(express.static('./methods-public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/v1/people', (req, res) => {
    return res.status(200).json({ success: true, data: people });
});

app.post('/api/v1/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide a name' });
    }

    people.push( { id: people.length + 1, name: name })
    return res.status(201).json({ success: true, data: name });
});

// Question 7
app.get('/api/v1/test', (req, res) => {
    return res.json({ message: "It worked!" });
});

// Question 8 - if you mis-type and leave out the leading slash, the route will not work!!!
app.get('/api/v1/products', (req, res) => {
    return res.json(products);
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
    return res.json(product);
});

// Question 11 and 12
app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query; 

    // by default if no query parameters are provided, we will return all products
    let queryProducts = [...products];
    
    if( search ){
        queryProducts = queryProducts.filter( (product) => {
            return product.name.startsWith(search);
        });
        
    }

    if( limit ){
        queryProducts = queryProducts.slice(0, parseInt(limit));
    }

    // if productPrice is less than or equal to the price query parameter, return the product
    if( price ){
        queryProducts = queryProducts.filter( (product) => {
            return product.price <= parseInt(price);
        });
    }

    if( queryProducts.length === 0 ) {
        return res.status(200).json({ message: "No products matched your search." });
    }

    return res.json(queryProducts);
});

// Question 6
app.all('*', (req, res) => {
    return res.status(404).send('<h1>404! The page you requested is not found!</h1>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});