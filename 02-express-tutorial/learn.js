const express = require('express');
const app = express();
let { people } = require('./data');

app.use(express.static('./methods-public'));

// urlencoded is a built-in method in express to recognize the incoming Request Object as strings or arrays.
// basically it parses the request object and makes it available under req.body property
app.use(express.urlencoded( {extended: false} ));

// ???
app.use(express.json());

app.get('/api/people', (req, res) => {
    res.status(200).json( { sucess: true, data: people});
});

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

app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if( !name ){
        return res
            .status(400)
            .json( {success: false, msg: 'Please provide a name value'});
    }

    res.status(201).json( {success: true, person: name} );
});

app.post('/api/postman/people', (req, res) => {
    const { name } = req.body;
    if( !name ){
        return res
            .status(400)
            .json( { success: true, msg: 'Please provide name value' });
    }

    // append the person that we add to the people array
    res.status(201).json( {success: true, data: [...people, name] });
})

app.put('/api/people/:id', (req, res) => { 
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find( (person) => person.id == Number(id) );

    if( !person ){
        return res
            .status(404)
            .json( {success: false, msg: `Person with id ${id} not found`} );
    }

    const newPeople = people.map( (person) => {
        if( person.id == Number(id) ){
            person.name = name;
        }
        return person;
    })

    res.status(200).json( { success: true, data: newPeople } );

    //console.log(id, name);
    //res.send('something to end the response');
});

app.delete('/api/people/:id', (req, res) => {
    const person = people.find( (person) => person.id == Number(req.params.id) );

    if( !person ){
        return res
            .status(404)
            .json( {success: false, msg: `Person with id ${req.params.id} not found`} );
    }

    const newPeople = people.filter( 
        (person) => person.id !== Number(req.params.id) 
    );
    return res.status(200).json( { success: true, data: newPeople } );
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});