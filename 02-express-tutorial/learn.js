const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

app.use(express.static('./methods-public'));

// urlencoded is a built-in method in express to recognize the incoming Request Object as strings or arrays.
// basically it parses the request object and makes it available under req.body property
app.use(express.urlencoded( {extended: false} ));

// ???
app.use(express.json());

app.use('/api/people', people);
app.use('/login', auth);

app.post('/login', (req, res) => {
    //console.log(req.body);

    // if name is provided, return a welcome message
    const { name } = req.body;
    if( name ){
        return res.status(200).send(`Welcome ${name}`);
    }
    
    // else no name was provided, return an error message
    res.status(401).send('Please provide credentials');
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});