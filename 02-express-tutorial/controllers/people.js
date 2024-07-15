let { people } = require('../data');

const getPeople = (req, res) => {
    res.status(200).json( { success: true, data: people});
}

const getPerson = (req, res) => {
    const { id } = req.params;

    const person = people.find( (person) => person.id === Number(id) );

    if( !person ){
        return res
            .status(404)
            .json( { success: false, msg: `Person with id ${id} not found` });
    }

    return res.status(200).json( { success: true, data: person });
}

const addPerson = (req, res) => {
    const { name } = req.body;
    if( !name ){
        return res
            .status(400)
            .json( {success: false, msg: 'Please provide a name value'});
    }

    //res.status(201).json( {success: true, person: name} );

    people.push( { id: people.length + 1, name: name })
    return res.status(201).json({ success: true, data: name });
}

const createPersonPostman = (req, res) => {
    const { name } = req.body;
    if( !name ){
        return res
            .status(400)
            .json( { success: true, msg: 'Please provide name value' });
    }

    // append the person that we add to the people array
    res.status(201).json( {success: true, data: [...people, name] });

}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
    const person = people.find( (person) => person.id == Number(req.params.id) );

    if( !person ){
        return res
            .status(404)
            .json( {success: false, msg: `Person with id ${req.params.id} not found`} );
    }

    const newPeople = people.filter( 
        (person) => person.id !== Number(req.params.id) 
    );

    // update the people array with the newPeople array with the person removed
    people = newPeople;
    return res.status(200).json( { success: true, data: people } );
}

module.exports = {
    getPeople,
    getPerson,
    addPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}