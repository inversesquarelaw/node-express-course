const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    //console.log(req.body);

    // if name is provided, return a welcome message
    const { name } = req.body;
    if( name ){
        return res.status(200).send(`Welcome ${name}`);
    }
    
    // else no name was provided, return an error message
    res.status(401).send('Please provide credentials');
});

module.exports = router;