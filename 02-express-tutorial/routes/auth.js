const express = require('express');
const router = express.Router();

const auth = (res, req, next) => {
    let cookieName = req.cookies.name;

    if( !cookieName ){
        return res.status(401).json( { msg: "unauthorized" } );
    }

    req.user = { name: cookieName };
    next();
}

router.post('/logon', (res, req, next) => {
});

router.delete('/logoff', (res, req, next) => {
});


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