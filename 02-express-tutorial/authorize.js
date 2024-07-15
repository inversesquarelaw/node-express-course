const authorize = (req, res, next) => {
    const { user } = req.query;

    // if the user is john, we will add a user property to the request object
    if( user === 'john' ) {
        // add a user property to the request object
        req.user = { name: 'john', id: 3 };
        // forwards the request to the next middleware in the stack
        next();
    } else {
        // if the user is not john, we will return a 401 status code
        // end the response and send a message
        res.status(401).send('Unauthorized');
    }
}

module.exports = authorize;